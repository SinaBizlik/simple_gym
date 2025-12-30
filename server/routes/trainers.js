const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');

// 1. TÜMÜNÜ GETİR (GET /api/trainers) -> Requirement List All [cite: 146]
router.get('/', async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. TEKİL GETİR (GET /api/trainers/:id) -> Requirement Get Item by ID [cite: 147]
router.get('/:id', async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Eğitmen bulunamadı' });
        res.status(200).json(trainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. OLUŞTUR (POST /api/trainers) -> Requirement Create [cite: 145]
router.post('/', async (req, res) => {
    try {
        const newTrainer = new Trainer(req.body);
        const savedTrainer = await newTrainer.save();
        res.status(201).json(savedTrainer);
    } catch (err) {
        res.status(400).json({ error: err.message }); // Validation Error [cite: 157]
    }
});

// 4. GÜNCELLE (PUT /api/trainers/:id) -> Requirement Update [cite: 148]
router.put('/:id', async (req, res) => {
    try {
        const updatedTrainer = await Trainer.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true } // Güncellenmiş veriyi döndür ve validasyonu çalıştır
        );
        if (!updatedTrainer) return res.status(404).json({ error: 'Eğitmen bulunamadı' });
        res.status(200).json(updatedTrainer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. SİL (DELETE /api/trainers/:id) -> Requirement Delete [cite: 149]
router.delete('/:id', async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Eğitmen bulunamadı' }); // 404 Error [cite: 158]
        res.status(200).json({ message: 'Eğitmen başarıyla silindi' });
    } catch (err) {
        res.status(500).json({ error: err.message }); // 500 Error [cite: 159]
    }
});

module.exports = router;