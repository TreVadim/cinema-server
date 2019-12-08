const passport = require("passport");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const User = require("../../models/user");
const { defaultUserImgPath } = require("../../config/constants");
const { to } = require("../../utils/async");
const { createUserObject } = require("../../utils/helperFunctions");
const { getJwt } = require("../../utils/getJwt");

module.exports = {
	login: async (req, res) => {
		passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login" }, (err, user, info) => {
			if (info) return res.status(info.code || 401).send({ message: info.message });

			const token = getJwt(user._id, user.role);

			return res.status(200).send({ user: createUserObject(user), token });
		})(req, res);
	},
	register: async (req, res) => {
		const { firstName, lastName, email, password, confirmPassword } = req.body;
		const user = await User.findOne({ "local.email": email });
		if (user) return res.status(400).send({ message: "User already exist" });

		if (!password) return res.status(401).send({ message: "Missing password" });
		if (password !== confirmPassword) return res.status(401).send({ message: "Passwords do not match" });

		const salt = await bcrypt.genSalt(10);
		const hashPass = await bcrypt.hash(password, salt);
		const fullUrl = `${req.protocol}://${req.get("host")}`;

		const [err, newUser] = await to(
			new User({
				method: "local",
				local: {
					firstName,
					lastName,
					email,
					password: hashPass,
					profilePhoto: fullUrl + defaultUserImgPath
				}
			}).save()
		);

		if (err) return res.status(400).send({ error: err.message });

		return res.status(200).send({
			message: "User was successfully register",
			id: newUser._id
		});
	},
	logout: (req, res) => {
		req.logout();
		res.status(200).send({ token: null });
	}
};
