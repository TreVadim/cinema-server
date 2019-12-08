const mongoose = require('mongoose');

const { Schema } = mongoose;

const tiketSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	movie: {
		type: Schema.Types.ObjectId,
		ref: 'movie'
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'room'
	},
	sessoin: {
		type: Schema.Types.ObjectId,
		ref: 'sessoin'
	}
}, { timestamps: true });

module.exports = mongoose.model('tiket', tiketSchema);
