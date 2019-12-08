const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../../models/user');
const { createUserObject } = require('../../utils/helperFunctions');
const { admin } = require('../../config/constants');

module.exports = {
	getUserById: async (req, res) => {
		const user = await User.findOne({ _id: req.params.id }, { __v: 0, 'local.password': 0 }).catch(
			() => null
		);

		if (!user) return res.status(404).send({ message: 'User not found' });

		return res.status(200).send({ user: createUserObject(user) });
	},
	getListOfUsers: async (req, res) => {
		const users = await User.find({}, { __v: 0, 'local.password': 0 });

		res.status(200).send({ users: users.map(user => createUserObject(user)) });
	},
	changeRole: async (req, res) => {
		try {
			const { userId, role } = req.body;
			const user = await User.findOne({ _id: userId }, { __v: 0, 'local.password': 0 });
			if (!user) throw new Error('User not found');
			if (user.role === +role) throw new Error('User already have this role');

			user.role = role;
			await user.save();

			return res.status(200).send({ message: 'Role successfully changed' });
		}
 catch (e) {
			return res.status(404).send({ message: e.message });
		}
	},
	editUser: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id });
			if (!user) throw new Error('User not found');

			const localId = mongoose.Types.ObjectId(req.user._id);
			const incomeId = mongoose.Types.ObjectId(req.params.id);

			if (req.user.role !== admin && !localId.equals(incomeId)) {
				throw new Error('You can change only yourself');
			}

			const {
 firstName, lastName, profilePhoto, password, confirmPassword, language, bio 
} = req.body;

			if (password && user.method === 'local') {
				if (password !== confirmPassword) throw new Error('Passwords do not match');

				const salt = await bcrypt.genSalt(10);
				const newHashPass = await bcrypt.hash(password, salt);
				user.local.password = newHashPass;
			}

			if (language) user.language = language;

			if (firstName) user[user.method].firstName = firstName;
			if (lastName) user[user.method].lastName = lastName;
			if (profilePhoto) user[user.method].profilePhoto = profilePhoto;
			if (bio) user[user.method].bio = bio;

			await user.save();
			return res.status(200).send({ message: 'All changes saved successfully' });
		}
 catch (error) {
			return res.status(400).send({ message: error.message });
		}
	},
	removeUser: async (req, res) => {
		const { id } = req.params;
		try {
			if (String(req.user._id) === id) throw new Error('User cannot delete himself');

			const user = await User.findOneAndDelete({ _id: req.params.id });
			if (!user) throw new Error('Change not saved');

			return res.send({ message: `User "${user[user.method].firstName}" successfuly deleted` });
		}
 catch (error) {
			return res.status(401).send({ message: error.message });
		}
	}
};
