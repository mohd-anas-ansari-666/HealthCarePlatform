const mongoose2 = require('mongoose');
const goalSchema = new mongoose2.Schema({
user: { type: mongoose2.Schema.Types.ObjectId, ref: 'User', required: true },
type: { type: String, enum: ['weight', 'steps'], required: true },
targetValue: Number,
dailyStepGoal: Number,
startDate: Date,
endDate: Date,
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose2.model('Goal', goalSchema);