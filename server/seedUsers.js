const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Şifreleme kütüphanesi
const dotenv = require('dotenv');
const User = require('./models/User'); // Kullanıcı modelin

// .env dosyasındaki Cloud bağlantısını al
dotenv.config();

const seedUsers = async () => {
    try {
        // 1. Veritabanına Bağlan
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🌱 MongoDB Cloud Bağlandı...');

        // 2. Eski/Hatalı tüm kullanıcıları temizle (Çakışma olmasın)
        await User.deleteMany({});
        console.log('🧹 Eski veriler temizlendi.');

        const hashedPassword = await bcrypt.hash('123456', 10);

        const users = [
            {
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            },
            {
                username: 'FitnessHocasi',
                password: hashedPassword,
                role: 'trainer',
                expertise: 'Fitness'
            },
            {
                username: 'YogaHocasi',
                password: hashedPassword,
                role: 'trainer',
                expertise: 'Yoga'
            },
            {
                username: 'BoksHocasi',
                password: hashedPassword,
                role: 'trainer',
                expertise: 'Kick Boks'
            },

            {
                username: 'SporcuAli',
                password: hashedPassword,
                role: 'user'
            },
            {
                username: 'SporcuAyse',
                password: hashedPassword,
                role: 'user'
            },
            {
                username: 'Pilates',
                password: hashedPassword,
                role: 'trainer',
                expertise: 'Pilates'
            }
        ];

        await User.insertMany(users);
        
        console.log('✅ Tüm kullanıcılar başarıyla eklendi!');
        console.log('🔑 Hepsinin şifresi: 123456');
        
        process.exit();
    } catch (error) {
        console.error('❌ Hata:', error);
        process.exit(1);
    }
};

seedUsers();