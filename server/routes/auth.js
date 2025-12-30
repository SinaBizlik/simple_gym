const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { username, password, role, expertise } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "Bu kullanıcı adı zaten alınmış." });

        const hashedPassword = await bcrypt.hash(password, 10);
AJAX
        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            expertise: role === 'trainer' ? expertise : undefined
        });

        await newUser.save();
        res.status(201).json({ message: "Kayıt başarılı!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("--- GİRİŞ İSTEĞİ GELDİ ---");
        console.log("Aranan Kullanıcı:", username);

        const user = await User.findOne({ username });
        if (!user) {
            console.log("❌ Kullanıcı Bulunamadı!");
            return res.status(400).json({ error: "Kullanıcı adı hatalı" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Şifre Yanlış!");
            return res.status(400).json({ error: "Şifre hatalı" });
        }

        console.log("✅ Giriş Başarılı! Token üretiliyor...");

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            role: user.role,
            id: user._id,
            expertise: user.expertise,
            username: user.username
        });
        
        console.log("📤 Cevap Frontend'e gönderildi.");

    } catch (err) {
        console.error("💥 Sunucu Hatası:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;