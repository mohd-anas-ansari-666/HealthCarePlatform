// FILE: controllers/doctorController.js
const UserModel = require('../models/User');
const StepsModel = require('../models/Step');


exports.getPatients = async (req, res, next) => {
try {
// doctors see patients assigned to them
const patients = await UserModel.find({ doctor: req.user.id, role: 'user' }).select('-passwordHash');
res.json(patients);
} catch (err) { next(err); }
};


exports.getPatientProgress = async (req, res, next) => {
try {
const patientId = req.params.id;
// sample: return last 30 days aggregation
const today = new Date(); today.setHours(0,0,0,0);
const from = new Date(today); from.setDate(from.getDate() - 29);
const rows = await StepsModel.aggregate([
{ $match: { user: require('mongoose').Types.ObjectId(patientId), date: { $gte: from, $lte: today } } },
{ $group: { _id: "$date", steps: { $sum: "$steps" } } },
{ $sort: { _id: 1 } }
]);
res.json(rows);
} catch (err) { next(err); }
};