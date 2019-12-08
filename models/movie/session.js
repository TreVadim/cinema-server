const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
	date: {
		type: Date,
		required: true
	},
	costs: {
		type: Number,
		required: true
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'room'
	},
	movie: {
		type: Schema.Types.ObjectId,
		ref: 'movie'
	}
}, { timestamps: true });

module.exports = mongoose.model('session', sessionSchema);
