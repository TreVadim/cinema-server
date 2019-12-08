module.exports = {
	createUserObject: (user) => {
		const {
			role, language, _id, method
		} = user;

		const {
			firstName, lastName, email, profilePhoto, bio
		} = user[method];

		return {
			role,
			language,
			_id,
			firstName,
			lastName,
			email,
			profilePhoto,
			bio
		};
	}
};
