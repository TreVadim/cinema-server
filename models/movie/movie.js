const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		age: {
			type: Number
		},
		trailer: {
			type: String,
			trim: true
		},
		language: {
			type: String
		},
		long: {
			type: Number,
			required: true,
			trim: true
		},
		poster: {
			type: String
		},
		rentStart: {
			type: Date,
			required: true
		},
		rentEnd: {
			type: Date,
			required: true
		},
		genre: [String],
		country: [String],
		actors: [String]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('movie', movieSchema);
