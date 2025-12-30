const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'trainer'], default: 'user' },
    
    // --- YENİ EKLENEN KISIM: UZMANLIK ALANI ---
    expertise: { 
        type: String, 
        // Sadece rolü 'trainer' olanlar için bu alanı kullanacağız
        required: false 
    }
});

module.exports = mongoose.model('User', UserSchema);