const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');
const Course = require('../models/Course');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        // Aggregation Queries (Toplama Sorguları)
        const trainerCount = await Trainer.countDocuments();
        const courseCount = await Course.countDocuments();
        const userCount = await User.countDocuments();

        // Örnek Aggregation: Ortalama ders fiyatı
        const priceStats = await Course.aggregate([
            { $group: { _id: null, avgPrice: { $avg: "$price" }, totalRevenue: { $sum: "$price" } } }
        ]);

        res.json({
            totalTrainers: trainerCount,
            totalCourses: courseCount,
            totalUsers: userCount,
            financials: priceStats[0] || { avgPrice: 0, totalRevenue: 0 }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;