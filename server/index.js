const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Ayarları yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Ara Yazılımlar)
app.use(cors()); // Frontend'in (port 3000) Backend'e (port 5000) erişmesine izin ver
app.use(express.json()); // JSON verilerini okuyabilmek için

// Rotaları Bağla
const trainerRoutes = require('./routes/trainers');
app.use('/api/trainers', trainerRoutes);
console.log("🔗 ŞU AN KULLANILAN MONGODB ADRESİ:", process.env.MONGO_URI);

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Bağlantısı Başarılı ✅'))
    .catch((err) => console.error('MongoDB Bağlantı Hatası ❌:', err));

// Ana Sayfa (Test için)
app.get('/', (req, res) => {
    res.send('Simple Gym Backend Çalışıyor 🚀');
});

// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

// ... (Önceki importlar)
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const statsRoutes = require('./routes/stats');
const requestRoute = require('./routes/requests');
const userRoute = require('./routes/users');




// Rotaları Kullan
app.use('/api/trainers', require('./routes/trainers')); // Eskisi
app.use('/api/auth', authRoutes);       // Yeni Giriş
app.use('/api/courses', courseRoutes);  // Yeni Dersler (İlişkili)
app.use('/api/statistics', statsRoutes); // Yeni İstatistik
app.use('/api/requests', requestRoute);
app.use('/api/users', userRoute);

// ... (Bağlantı kodları)