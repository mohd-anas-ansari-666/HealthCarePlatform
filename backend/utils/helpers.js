const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function hashPassword(password) {
const salt = await bcrypt.genSalt(10);
return bcrypt.hash(password, salt);
}


async function comparePassword(password, hash) {
return bcrypt.compare(password, hash);
}


function signToken(user) {
const payload = { id: user._id, role: user.role };
return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}


function computeDistanceKm(steps, stepLengthCm = 75) {
return (steps * stepLengthCm) / 100000;
}


function computeCalories(distanceKm, weightKg) {
// Rough approximation: 0.9 kcal per kg per km walking
return distanceKm * (weightKg || 70) * 0.9;
}


module.exports = { hashPassword, comparePassword, signToken, computeDistanceKm, computeCalories };