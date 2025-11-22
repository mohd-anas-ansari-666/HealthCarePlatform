// FILE: controllers/patientController.js
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const { computeDistanceKm, computeCalories } = require('../utils/helpers');


// Add or update steps for a date
exports.addSteps = async (req, res, next) => {
try {
const { date, steps } = req.body;
const day = date ? new Date(date) : new Date();
// normalize to midnight UTC
day.setHours(0,0,0,0);
const userId = req.user.id;
let entry = await Steps.findOne({ user: userId, date: day });
const distanceKm = computeDistanceKm(steps, req.user.stepLengthCm);
const calories = computeCalories(distanceKm, req.user.weightKg);
if (entry) {
entry.steps = steps;
entry.distanceKm = distanceKm;
entry.calories = calories;
await entry.save();
} else {
entry = await Steps.create({ user: userId, date: day, steps, distanceKm, calories });
}
// update streak
await updateStreak(userId, day);
res.json(entry);
} catch (err) {
next(err);
}
};


exports.getDailySteps = async (req, res, next) => {
try {
const day = new Date(); day.setHours(0,0,0,0);
const entry = await Steps.findOne({ user: req.user.id, date: day });
res.json(entry || { steps: 0 });
} catch (err) { next(err); }
};


// Aggregations for charts
exports.getWeekly = async (req, res, next) => {
try {
const userId = req.user.id;
const today = new Date(); today.setHours(0,0,0,0);
const sevenDaysAgo = new Date(today); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
const rows = await Steps.aggregate([
{ $match: { user: require('mongoose').Types.ObjectId(userId), date: { $gte: sevenDaysAgo, $lte: today } } },
{ $group: { _id: "$date", steps: { $sum: "$steps" }, calories: { $sum: "$calories" } } },
{ $sort: { _id: 1 } }
]);
res.json(rows);
} catch (err) { next(err); }
};


// helper to update streak
async function updateStreak(userId, day) {
const User = require('../models/User');
const Steps = require('../models/Step');
const user = await User.findById(userId);
const goal = await Goal.findOne({ user: userId, type: 'steps' });
const target = goal ? (goal.dailyStepGoal || 5000) : 5000;
const yesterday = new Date(day); yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(0,0,0,0);
const y = await Steps.findOne({ user: userId, date: yesterday });
const todayEntry = await Steps.findOne({ user: userId, date: day });
let newStreak = 0;
if (todayEntry && todayEntry.steps >= target) {
newStreak = (y && y.steps >= target) ? (user.streakCurrent + 1) : 1;
} else {
newStreak = 0;
}
user.streakCurrent = newStreak;
if (newStreak > user.bestStreak) user.bestStreak = newStreak;
await user.save();
}