const Room = require('../../models/movie/room');
const Space = require('../../models/movie/space');

const { to } = require('../../utils/async');
const { findOneAndUpdateConfig } = require('../../config/constants');

module.exports = {
	getRoomList: async (req, res) => {
		const [err, rooms] = await to(Room.find({}, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ rooms });
	},
	createRoom: async (req, res) => {
		const { name } = req.body;

		const [err, room] = await to(Room
			.findOneAndUpdate(
				{ name },
				{ $set: { name } },
				{ ...findOneAndUpdateConfig, upsert: true }
			));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ room });
	},
	editRoom: async (req, res) => {
		const { name } = req.body;

		const [err, room] = await to(Room
			.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: { name } },
				findOneAndUpdateConfig
			));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ room });
	},
	removeRoom: async (req, res) => {
		const [err, room] = await to(Room.findOneAndRemove(
			{ _id: req.params.id },
			{ useFindAndModify: false }
		));
		if (err) return res.status(400).send({ message: err.message });
		if (!room) return res.status(404).send({ message: 'Room not found' });

		const [error, space] = await to(Space.find({ room: room.id }));
		if (error) return res.status(400).send({ message: error.message });

		space.forEach(el => el.remove());

		return res.status(200).send({ message: `${room.name} successfully removed` });
	}
};
