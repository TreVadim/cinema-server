const Session = require('../../models/movie/session');
const Space = require('../../models/movie/space');
const Shadow = require('../../models/movie/shadow');

const { to } = require('../../utils/async');
const { findOneAndUpdateConfig } = require('../../config/constants');

module.exports = {
	getSessionList: async (req, res) => {
		const [err, session] = await to(Session.find(req.query, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ session });
	},
	createSession: async (req, res) => {
		const {
			date, costs, room, movie
		} = req.body;
		const [err, newSession] = await to(new Session({
			date, costs, room, movie
		}).save());
		if (err) return res.status(400).send({ message: err.message });

		const currentSpaces = await Space.find({ room }, { __v: 0 });

		const promises = currentSpaces.map(async (el) => {
			const newSadowPlace = await new Shadow({
				user: req.user._id, space: el._id, session: newSession, row: el.row, place: el.place
			}).save();

			return newSadowPlace;
		});

		await Promise.all(promises);

		return res.status(200).send({ newSession });
	},
	updateSession: async (req, res) => {
		const [err, room] = await to(Session
			.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: req.body },
				findOneAndUpdateConfig
			));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ room });
	},
	removeSession: async (req, res) => {
		const [err, session] = await to(Session.findOneAndRemove({ _id: req.params.id }));
		if (err) return res.status(400).send({ message: err.message });

		const [error, RemovedSession] = await to(Shadow.find({ session: session.id }));
		if (error) return res.status(400).send({ message: error.message });

		RemovedSession.forEach(el => el.remove());

		return res.status(200).send({ message: 'Session removed successfully' });
	}
};
