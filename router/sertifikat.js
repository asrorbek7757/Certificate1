const { Router } = require('express')

const sertificat = Router();

const { getSertificat, createSertificat, } = require('../controls/sertifikat')

sertificat.get('/getSertificat', getSertificat);
sertificat.post('/createSertificat', createSertificat);



module.exports =  sertificat 