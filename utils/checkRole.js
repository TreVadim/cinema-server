module.exports = {
	checkRole: role => async (req, res, next) => {
		const { user } = req;

		if (user.role !== role) {
			return res.status(403).send({ message: 'Permission denied.' });
		}

		return next();
	}
};
