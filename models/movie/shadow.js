const mongoose = require('mongoose');

const { Schema } = mongoose;

const shadowSchema = new Schema({
	free: {
		type: Boolean,
		required: true,
		default: false
	},
	booked: {
		type: Boolean,
		required: true,
		default: false
	},
	row: {
		type: Number,
		required: true
	},
	place: {
		type: Number,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	space: {
		type: Schema.Types.ObjectId,
		ref: 'space'
	},
	session: {
		type: Schema.Types.ObjectId,
		ref: 'session'
	}
}, { timestamps: true });

module.exports = mongoose.model('shadow', shadowSchema);
