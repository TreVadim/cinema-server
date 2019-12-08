/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod-db');
}
else {
	module.exports = require('./dev-db');
}

/* eslint-enable global-require */
