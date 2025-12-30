const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  courseType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  
  // 👇 BU SATIRI EKLE (Hocanın ID'sini burada saklayacağız)
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  status: { type: String, default: 'bekliyor' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);