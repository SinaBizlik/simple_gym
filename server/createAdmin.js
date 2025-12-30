const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Bağlandı...');

        // Eski admin varsa sil (Temiz başlangıç)
        await User.deleteOne({ username: 'admin' });

        // Şifreyi şifrele
        const hashedPassword = await bcrypt.hash('123456', 10);

        // Yeni Admin Kullanıcısı
        const newAdmin = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'admin' // Rolü admin olarak belirledik
        });

        await newAdmin.save();
        console.log('✅ Admin hesabı başarıyla oluşturuldu!');
        console.log('Kullanıcı Adı: admin');
        console.log('Şifre: 123456');
        
        process.exit();
    } catch (error) {
        console.error('Hata:', error);
        process.exit(1);
    }
};

createAdmin();