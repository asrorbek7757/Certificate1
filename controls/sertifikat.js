const Sertificat = require('../model/SertifikatSchema');


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
module.exports = {
    getSertificat,
    createSertificat,
    deleteSertifikat
};
