module.exports = {
	user: 0,
	admin: 1,
	role: [0, 1],
	defaultUserImgPath: "/static/img/default-user.jpeg",
	defaultUserImg: "default-user.jpeg",
	dafautNoImagePath: "/static/img/no-image.png",
	defaultNoImage: "no-image.png",
	findOneAndUpdateConfig: {
		useFindAndModify: false,
		new: true,
		runValidators: true
	}
};
