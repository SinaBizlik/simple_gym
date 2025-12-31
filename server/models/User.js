const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String }, 
    role: { type: String, enum: ['admin', 'user', 'trainer'], default: 'user' },
    
    // Eğitmenler için uzmanlık alanı
    expertise: { type: String, required: false },

    // 👇 BU KISIM YOKSA KAYIT YAPMAZ! 👇
    progress: [
        {
            date: { type: Date, default: Date.now },
            weight: { type: Number },
            height: { type: Number },
            bmi: { type: Number }
        }
    ]
    // 👆

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);