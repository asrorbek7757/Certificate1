const fileUpload = require('express-fileupload');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const token = process.env.TELEGRAM_TOKEN;



const upload =  async (req, res) => {
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
};
module.exports = {
 upload
  };