const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen bir isim giriniz']
    },
    expertise: {
        type: String,
        required: [true, 'Uzmanlık alanı zorunludur']
    },
    imgKeyword: {
        type: String,
        default: 'gym' // Resimler için varsayılan anahtar kelime
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trainer', TrainerSchema);