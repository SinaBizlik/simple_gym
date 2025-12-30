const router = require('express').Router();
const Course = require('../models/Course');
const User = require('../models/User');

// 1. DERS EKLE (Hoca Kontenjanı da Gönderecek)
router.post('/', async (req, res) => {
    const { title, date, image, trainerId, quota } = req.body; // quota eklendi

    try {
        const trainer = await User.findById(trainerId);
        if (!trainer || trainer.role !== 'trainer') {
            return res.status(403).json({ error: "Sadece eğitmenler ders açabilir!" });
        }

        const courseType = trainer.expertise || 'Genel'; 

        const newCourse = new Course({
            title,
            type: courseType, 
            trainer: trainer._id,
            trainerName: trainer.username,
            date: new Date(date),
            image,
            quota: quota || 20 // Eğer hoca girmezse varsayılan 20 olsun
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. TÜM DERSLERİ GETİR
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().sort({ date: 1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. DERSE KATIL (YENİ ÖZELLİK)
router.post('/:id/join', async (req, res) => {
    const { userId } = req.body; // Katılmak isteyen üye ID'si

    try {
        const course = await Course.findById(req.params.id);
        
        // Doluluk Kontrolü
        if (course.participants.length >= course.quota) {
            return res.status(400).json({ error: "Kontenjan dolu!" });
        }

        // Zaten katılmış mı kontrolü
        if (course.participants.includes(userId)) {
            return res.status(400).json({ error: "Zaten bu derse kayıtlısınız." });
        }

        // Listeye ekle ve kaydet
        course.participants.push(userId);
        await course.save();

        res.status(200).json({ message: "Başarıyla kayıt olundu!", course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json("Ders silindi.");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;