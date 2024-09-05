const { Router } = require('express')

const upload = Router();

const { upload } = require('../controls/upload')

upload.post('/upload', upload);




module.exports = upload