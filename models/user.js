const mongoose = require('mongoose');
const { role } = require('../config/constants');

const { Schema } = mongoose;

const userSchema = new Schema({
	method: {
		type: String,
		enum: ['local', 'google', 'instagram'],
		required: true
	},
	local: {
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
		},
		profilePhoto: {
			type: String
		}
	},
	google: {
		googleId: {
			type: String
		},
		email: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		profilePhoto: {
			type: String
		}
	},
	role: {
		type: Number,
		required: true,
		default: 0
	},
	instagram: {
		instagramId: {
			type: String
		},
		email: {
			type: String
		},
		firstName: {
			type: String
		},
		profilePhoto: {
			type: String
		},
		bio: {
			type: String
		}
	},
	language: {
		type: String,
		required: true,
		default: 'en'
	}
}, { timestamps: true });

userSchema.pre('validate', function cal(next) {
	if (!role.some(el => el === this.role)) this.invalidate('role', 'Incorrect Role');

	if (this.method !== 'local') return next();

	if (!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		this.local.email,
	)) this.invalidate('email', 'Incorrect Email');

	if (!this.local.firstName) this.invalidate('firstName', 'Miss FirstName');
	if (!this.local.lastName) this.invalidate('lastName', 'Miss LastName');

	if (!this.local.firstName.trim()) this.invalidate('firstName', 'Incorrect FirstName');
	if (!this.local.lastName.trim()) this.invalidate('lastName', 'Incorrect LastName');
	if (!this.local.profilePhoto.trim()) this.invalidate('profilePhoto', 'Incorrect Profile photo');

	return next();
});

module.exports = mongoose.model('users', userSchema);
