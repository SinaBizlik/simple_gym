const router = require('express').Router();
const User = require('../models/User');

// 1. TÜM KULLANICILARI GETİR (Admin Paneli İçin)
router.get('/', async (req, res) => {
    try {
        const { search } = req.query; // Arama özelliği için
        let query = {};
        
        if (search) {
            query = { username: { $regex: search, $options: 'i' } };
        }

        const users = await User.find(query).select('-password'); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. KULLANICI SİL (Admin Paneli İçin)
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Kullanıcı silindi.");
    } catch (err) {
        res.status(500).json(err);
    }
});

// 👇 YENİ EKLENEN KISIMLAR (PROFİL SAYFASI İÇİN) 👇

// 3. KULLANICIYA YENİ VÜCUT ÖLÇÜMÜ EKLE
router.post('/:id/progress', async (req, res) => {
    try {
        const { weight, height } = req.body;
        
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("Kullanıcı bulunamadı");
        
        // 🛡️ GÜVENLİK KONTROLÜ: Eğer veritabanında bu dizi hiç yoksa, biz oluşturalım.
        if (!user.progress) {
            user.progress = [];
        }

        user.progress.push({ 
            weight, 
            height, 
            bmi: Number(bmi) 
        });

        await user.save();
        res.status(200).json(user.progress);
    } catch (err) {
        console.log("HATA DETAYI:", err); // Hatayı terminale yazdırır
        res.status(500).json(err);
    }
});

// 4. KULLANICININ GEÇMİŞ GELİŞİMİNİ GETİR
router.get('/:id/progress', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("Kullanıcı bulunamadı");
        
        res.status(200).json(user.progress);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;