const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const upload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');

const { mongoDBUrl } = require('./config/database');
const { authenticateJWT } = require('./passport');

mongoose.connect(mongoDBUrl, { useCreateIndex: true, useNewUrlParser: true });

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./passport');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(upload());

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
const auth = require('./route/auth');
const documents = require('./route/documents');
const users = require('./route/users');
const movie = require('./route/movie');

app.use('/api/auth', auth);
app.use('/api/documents', authenticateJWT, documents);
app.use('/api/users', authenticateJWT, users);
app.use('/api/movie', movie);

const options = {
	customCss: '.response:not(:last-child) { border-bottom: 1px solid #a9a98b }'
};

const swaggerDocument = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Now listening on ${PORT} port`));
