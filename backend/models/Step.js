// FILE: models/Step.js
const mongoose4 = require('mongoose');
const stepSchema = new mongoose4.Schema({
user: { type: mongoose4.Schema.Types.ObjectId, ref: 'User', required: true },
date: { type: Date, required: true },
steps: { type: Number, default: 0 },
distanceKm: { type: Number, default: 0 },
calories: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});
stepSchema.index({ user: 1, date: 1 }, { unique: true });
module.exports = mongoose4.model('Step', stepSchema);