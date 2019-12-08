const Movie = require('../../models/movie/movie');

const { to } = require('../../utils/async');

module.exports = {
	getMovie: async (req, res) => {
		const [err, movie] = await to(Movie
			.find(req.query, { __v: 0 })
			.populate('actorsWiki', { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ movie });
	},
	createMovie: async (req, res) => {
		const [err, movie] = await to(new Movie({ ...req.body }).save());
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ movie });
	},
	updateMovie: async (req, res) => {
		const {
			title,
			description,
			age,
			trailer,
			language,
			long,
			poster,
			rentStart,
			rentEnd,
			genre,
			country,
			actors
		} = req.body;

		const [error, currentMovie] = await to(Movie.findById(req.params.id, { __v: 0 }));
		if (error) return res.status(400).send({ message: error.message });
		if (!currentMovie) return res.status(400).send({ message: 'Movie not found' });


		if (title) currentMovie.title = title;
		if (description) currentMovie.description = description;
		if (age) currentMovie.age = age;
		if (trailer) currentMovie.trailer = trailer;
		if (language) currentMovie.language = language;
		if (long) currentMovie.long = long;
		if (poster) currentMovie.poster = poster;
		if (rentStart) currentMovie.rentStart = rentStart;
		if (rentEnd) currentMovie.rentEnd = rentEnd;
		if (genre && Array.isArray(genre)) currentMovie.genre = genre;
		if (country && Array.isArray(country)) currentMovie.country = country;
		if (actors && Array.isArray(actors)) currentMovie.actors = actors;

		const [err, newMovie] = await to(currentMovie.save());
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ movie: newMovie });
	},
	deleteMovie: async (req, res) => {
		const [err, movie] = await to(Movie.findOneAndDelete(
			{ _id: req.params.id }
		));
		if (err) return res.status(400).send({ message: err.message });
		if (!movie) return res.status(400).send({ message: 'Change not saved' });

		return res.status(200).send({ message: `Movie ${movie.title} successfully removed` });
	}
};
