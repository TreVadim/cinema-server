const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/database');

module.exports = {
	getJwt: (id, role) => {
		const token = jwt.sign({ id, role }, secretKey, {
			expiresIn: 86400 * 7 // 7 days
			// expiresIn: 86400 // 24 hours
			// expiresIn: 300 // 5 min
		});

		return token;
	}
};
