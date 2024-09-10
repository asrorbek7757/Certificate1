const Sertificat = require('../model/SertifikatSchema');
const token = process.env.TELEGRAM_TOKEN;
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
// Foydalanuvchilarni olish funksiyasi
const getSertificat = async (req, res) => {
    try {
        const data = await Sertificat.find();
        res.json({
            success: true,
            message: "All sertificat",
            innerData: data
        });
    } catch (error) {
        console.error("Error>>>", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

  

// Ro'yxatdan o'tish funksiyasi
const createSertificat = async (req, res) => {
    try {
        const {
         fname,
         lname,
         date,
         markazNomi,
         fanNomi,
         userId
        } = req.body;
        
        
        const existingSertificat = await Sertificat.findOne({lname, userId  });
        if (existingSertificat) {
            return res.status(400).json({
                success: false,
                message: "Bu Sertificat egasi allaqachon mavjud!!!"
            });
        }

      
        
    
        const newSertificate = new Sertificat({
       fname,
       lname,
       date,
       markazNomi,
       fanNomi,
       userId

        });

        // Yangi Sertificat saqlash
        await newSertificate.save();
        
        // Muvaffaqiyatli ro'yxatdan o'tkazilganlik xabari
        return res.status(201).json({
            success: true,
            message: "Sertificat yaratish muvaffaqiyatli amalga oshirildi!"
        });
    } catch (error) {
        console.error("Xatolik:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi!"
        });
    }
};
// Delete funksiyasi
const deleteSertifikat = async (req, res)=>{
    try {
        let { _id } = req.params;
        let deleted = await Sertificat.findByIdAndDelete({_id: _id });
        if (!deleted){
            return  res.json({
                seccess: false,
                message: "Sertifikat is not found!",
                innerData: deleted
            })
        }
        res.json({
            seccess: true,
            message: "Sertiifkat is found!",
            innerData: deleted
        })

    }catch(error){
        res.json({ seccess: true, message: error })
    }
}
const uploadSertifikat = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const filePath = `${__dirname}/${file.name}`;

    file.mv(filePath, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        try {
            const formData = new FormData();
            formData.append('document', fs.createReadStream(filePath));

            const response = await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
                headers: formData.getHeaders(),
                params: {
                    chat_id: 6039225297 // O'zingizning chat_id ni qo'shing
                },
            });

            console.log(response.data);
            res.send('File uploaded and sent to telegram bot successfully!');
        } catch (error) {
            console.error('Error sending file to Telegram bot:', error);
            res.status(500).send('Error sending file to Telegram bot.');
        } finally {
            fs.unlinkSync(filePath);
        }
    });
}
module.exports = {
    getSertificat,
    createSertificat,
    deleteSertifikat,
    uploadSertifikat
};
