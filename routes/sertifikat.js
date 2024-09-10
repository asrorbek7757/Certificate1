const { Router } = require('express')

const sertificat = Router();

const { getSertificat, createSertificat, deleteSertifikat, uploadSertifikat } = require('../controls/sertifikat')

sertificat.get('/getSertificat', getSertificat);
sertificat.post('/createSertificat', createSertificat);
sertificat.post('/uploadSertifikat', uploadSertifikat);
sertificat.delete('/deleteSertifikat/:_id', deleteSertifikat);



module.exports =  sertificat 