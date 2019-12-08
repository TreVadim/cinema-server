const Space = require('../../models/movie/space');
const Shadow = require('../../models/movie/shadow');

const { to } = require('../../utils/async');
const { findOneAndUpdateConfig } = require('../../config/constants');

module.exports = {
	getShadowSpace: async (req, res) => {
		const [err, space] = await to(Shadow.find(req.query, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ space, count: space.length });
	},
	getSpace: async (req, res) => {
		const [err, space] = await to(Space.find(req.query, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ space, count: space.length });
	},
	createSpace: async (req, res) => {
		const { row, place, room } = req.body;
		const [err, space] = await to(Space.findOneAndUpdate(
			{ row, place, room },
			{ $set: { row, place, room } },
			{ ...findOneAndUpdateConfig, upsert: true }
		));

		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ space });
	},
	createSpaceMulty: async (req, res) => {
		const { space, room } = req.body;

		function* checkDeep(arr) {
			yield arr.find(el => parseInt(el, 10) !== +el);
		}

		function* hasDuplicate(array) {
			yield array.reduce((acc, el, i, arr) => {
				if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
			}, []);
		}

		function* check(el) {
			yield* hasDuplicate(el);
			yield* checkDeep(el);
		}

		const [error] = await to(new Promise((resolve) => {
			Object.keys(space).forEach((el) => {
				if (!parseInt(el, 10)) throw new Error(`Row ${el} in not valid`);
				const generator = check(space[el]);
				const duplicate = generator.next();
				if (duplicate.value.length !== 0) throw new Error(`Row ${el} has duplicate places`);
				const err = generator.next();
				if (err.value) throw new Error(`Row ${el} has incorrect places - ${err.value}`);
			});

			resolve();
		}));
		if (error) return res.status(400).send({ message: error.message });

		Object.keys(space).forEach((el) => {
			space[el].forEach(async (elem) => {
				await new Space({ row: el, place: elem, room }).save();
			});
		});

		return res.send({ message: 'All spaces successfully created' });
	},
	updateSpace: async (req, res) => {
		const { free } = req.body;
		const [err, shadow] = await to(Shadow.findById(req.params.id));
		if (err) return res.status(400).send({ message: err.message });
		shadow.free = free;
		if (free) shadow.user = req.user._id;

		const [error, updatedspace] = await to(shadow.save());
		if (error) return res.status(400).send({ message: error.message });

		return res.status(200).send({ space: updatedspace });
	},
	bookedSpace: async (req, res) => {
		const { booked } = req.body;
		const [err, shadow] = await to(Shadow.findById(req.params.id));
		if (err) return res.status(400).send({ message: err.message });
		shadow.booked = booked;
		if (booked) shadow.user = req.user._id;

		const [error, updatedShadow] = await to(shadow.save());
		if (error) return res.status(400).send({ message: error.message });

		return res.status(200).send({ space: updatedShadow });
	},
	removeSpace: async (req, res) => {
		const [err] = await to(Space.findOneAndRemove({ _id: req.params.id }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ message: 'Space removed successfully' });
	}
};
