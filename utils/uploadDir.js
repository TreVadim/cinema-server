const path = require('path');

module.exports = {
	uploadDir: path.join(__dirname, '../public/img/'),
	rootDir: path.dirname(process.mainModule.filename)
};
