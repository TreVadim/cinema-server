const express = require('express');

const document = require('../../controllers/documents');

const router = express.Router();

router.post('/', document.uploadImage); // download img

module.exports = router;
