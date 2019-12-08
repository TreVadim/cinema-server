const mongoose = require('mongoose');

const { Schema } = mongoose;

const actorSchema = new Schema({
	fullName: {
		type: String,
		default: '',
		trim: true
	},
	img: {
		type: String,
		default: '',
		trim: true
	},
	movie: [{
		type: Schema.Types.ObjectId,
		ref: 'movie'
	}],
	career: [String]
}, { timestamps: true });

module.exports = mongoose.model('actor', actorSchema);
