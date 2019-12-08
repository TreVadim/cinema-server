const Tiket = require('../../models/movie/tiket');

const { to } = require('../../utils/async');

module.exports = {
	getTiketByUser: async (req, res) => {
		const [err, tiket] = await to(Tiket
			.find({ user: req.user._id }, { __v: 0, user: 0 })
			.populate('movie', {
				__v: 0, genre: 0, country: 0, actors: 0, age: 0, trailer: 0
			})
			.populate('room', { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ tiket });
	},
	createTiket: async (req, res) => {
		const [err, tiket] = await to(new Tiket({ ...req.body, user: req.user._id }).save());
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ tiket });
	}
};
