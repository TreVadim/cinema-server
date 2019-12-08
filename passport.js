const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { secretKey } = require('./config/database');

const User = require('./models/user');

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			const user = await User.findOne({ 'local.email': email }, { __v: 0 }).catch(() => done({ message: 'Error on the server.' }, false));

			if (!user) return done(null, false, { code: 404, message: 'User not found' });

			return bcrypt.compare(password, user.local.password, (err, matched) => {
				if (err) return err;

				if (!matched) return done(null, false, { code: 401, message: 'Incorrect email or password.' });

				return done(null, user);
			});
		}
	)
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;
opts.verify = true;

passport.use(
	new JwtStrategy(opts, async (jwtPayload, done) => {
		const user = await User.findById(jwtPayload.id, { password: 0, __v: 0 }).catch(err => done(err));

		if (!user) return done(null, false, { code: 404, message: 'User not found' });

		return done(null, user);
	})
);

module.exports = {
	authenticateJWT: passport.authenticate('jwt', { session: false })
};
