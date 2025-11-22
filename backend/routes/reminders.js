// FILE: routes/reminders.js
const express5 = require('express');
const router5 = express5.Router();
const Reminder = require('../models/Reminder');
const auth = require('../middleware/auth');


router5.post('/', auth(), async (req, res, next) => {
try {
const { title, message, datetime, type, repeat } = req.body;
const r = await Reminder.create({ user: req.user.id, title, message, datetime, type, repeat });
res.json(r);
} catch (err) { next(err); }
});


router5.get('/today', auth(), async (req, res, next) => {
try {
const today = new Date();
const start = new Date(today); start.setHours(0,0,0,0);
const end = new Date(today); end.setHours(23,59,59,999);
const list = await Reminder.find({ user: req.user.id, datetime: { $gte: start, $lte: end } });
res.json(list);
} catch (err) { next(err); }
});


router5.get('/upcoming', auth(), async (req, res, next) => {
try {
const today = new Date();
const end = new Date(); end.setDate(end.getDate() + 7);
const list = await Reminder.find({ user: req.user.id, datetime: { $gte: today, $lte: end } });
res.json(list);
} catch (err) { next(err); }
});


router5.put('/:id', auth(), async (req, res, next) => {
try {
const r = await Reminder.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
res.json(r);
} catch (err) { next(err); }
});


router5.delete('/:id', auth(), async (req, res, next) => {
try {
await Reminder.deleteOne({ _id: req.params.id, user: req.user.id });
res.json({ ok: true });
} catch (err) { next(err); }
});


module.exports = router5;