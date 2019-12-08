const mongoose = require('mongoose');

const { Schema } = mongoose;

const spaseSchema = new Schema({
	row: {
		type: Number,
		required: true
	},
	place: {
		type: Number,
		required: true
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'room'
	}
}, { timestamps: true });

module.exports = mongoose.model('space', spaseSchema);
