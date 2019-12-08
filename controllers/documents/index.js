const sizeOf = require("image-size");

const MAX_SIZE = 200;

module.exports = {
	uploadImage: async (req, res) => {
		const { file } = req.files;
		if (!file) return res.status(400).send({ message: "Document not upload" });

		const { height, width } = sizeOf(file.data);
		if (height > MAX_SIZE || width > MAX_SIZE)
			return res.status(400).send({ message: "Image should be 200x200 or smaller" });

		const image = Buffer.from(file.data).toString("base64");

		return res.status(200).send({ link: `data:image/gif;base64,${image}` });
	}
};
