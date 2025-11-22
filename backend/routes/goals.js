// FILE: routes/goals.js
const express4 = require('express');
const router4 = express4.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');


router4.post('/', auth(), async (req, res, next) => {
try {
const userId = req.user.id;
const { type, targetValue, dailyStepGoal, startDate, endDate } = req.body;
let goal = await Goal.findOne({ user: userId, type });
if (goal) {
goal.targetValue = targetValue || goal.targetValue;
goal.dailyStepGoal = dailyStepGoal || goal.dailyStepGoal;
goal.startDate = startDate || goal.startDate;
goal.endDate = endDate || goal.endDate;
await goal.save();
} else {
goal = await Goal.create({ user: userId, type, targetValue, dailyStepGoal, startDate, endDate });
}
res.json(goal);
} catch (err) { next(err); }
});


router4.get('/', auth(), async (req, res, next) => {
try {
const goals = await Goal.find({ user: req.user.id });
res.json(goals);
} catch (err) { next(err); }
});


module.exports = router4;