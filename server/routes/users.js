const router = require('express').Router();
const User = require('../models/User');

// TÜM KULLANICILARI GETİR
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// KULLANICI SİL
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Kullanıcı silindi.");
    } catch (err) {
        res.status(500).json(err);
    }
});

// 👇 BU SATIR ÇOK ÖNEMLİ! BU YOKSA HATA VERİR.
module.exports = router;