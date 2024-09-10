const { Router } = require('express')

const sertificat = Router();

const { getSertificat, createSertificat, deleteSertifikat, uploadFile } = require('../controls/sertifikat')

sertificat.get('/getSertificat', getSertificat);
sertificat.post('/createSertificat', createSertificat);
sertificat.post('/uploadFile', uploadFile);
sertificat.delete('/deleteSertifikat/:_id', deleteSertifikat);



module.exports =  sertificat 