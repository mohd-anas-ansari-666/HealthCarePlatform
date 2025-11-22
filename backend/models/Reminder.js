const mongoose3 = require('mongoose');
const reminderSchema = new mongoose3.Schema({
user: { type: mongoose3.Schema.Types.ObjectId, ref: 'User', required: true },
title: String,
message: String,
datetime: { type: Date, required: true },
type: { type: String, enum: ['doctor_visit', 'blood_test', 'custom'], default: 'custom' },
repeat: { type: String, enum: [null, 'daily', 'weekly', 'monthly'], default: null },
completed: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose3.model('Reminder', reminderSchema);