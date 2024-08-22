const { Schema, model } = require('mongoose');

const sertificatSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    date: { type: Date, required: true },
    markazNomi: { type: String, required: true },
    fanNomi: { type: String, required: true },
    userId: { type: String, required: true }, // Agar `userId` string bo'lsa
});

const Sertificat = model('sertificat', sertificatSchema);
module.exports = Sertificat;
