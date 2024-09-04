const { Router } = require('express')

const sertificat = Router();

const { getSertificat, createSertificat, deleteSertifikat } = require('../controls/sertifikat')

sertificat.get('/getSertificat', getSertificat);
sertificat.post('/createSertificat', createSertificat);
sertificat.delete('/deleteSertifikat/:_id', deleteSertifikat);



module.exports =  sertificat 