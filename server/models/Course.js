const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // Fitness, Yoga vb.
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Hoca ID
  trainerName: { type: String }, // Hoca Adı
  date: { type: Date, required: true },
  image: { type: String },
  quota: { type: Number, required: true, default: 20 }, // Kontenjan (Hoca belirleyecek)
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Katılanların Listesi
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);