const router = require('express').Router();
const Request = require('../models/Request');

// 1. TALEP OLUŞTUR (POST)
router.post('/', async (req, res) => {
  try {
    const { memberId, username, courseType, date, time } = req.body;

    const newRequest = new Request({
      memberId,
      username,
      courseType: courseType.toLowerCase(),
      date,
      time
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. TALEPLERİ GETİR (GET)
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. TALEBİ GÜNCELLE - ONAYLA/REDDET/REVİZE (PUT) - EKSİK OLAN KISIM BURASIYDI
router.put('/:id', async (req, res) => {
  try {
    // trainerId verisini de alıyoruz
    const { status, date, time, trainerId } = req.body;
    
    const updateData = { status };

    if (date) updateData.date = date;
    if (time) updateData.time = time;
    // 👇 EĞER HOCA ID GELDİYSE KAYDET
    if (trainerId) updateData.trainerId = trainerId;

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json("Talep silindi.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

module.exports = router;