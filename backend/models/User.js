const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
role: { type: String, enum: ['user', 'doctor', 'admin'], default: 'user' },
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
phone: String,
heightCm: Number,
weightKg: Number,
targetWeightKg: Number,
bloodGroup: String,
stepLengthCm: { type: Number, default: 75 },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
streakCurrent: { type: Number, default: 0 },
bestStreak: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);