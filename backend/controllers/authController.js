const User = require('../models/User');
const { validationResult } = require('express-validator');
const { hashPassword, comparePassword, signToken } = require('../utils/helpers');


exports.register = async (req, res, next) => {
try {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { name, email, password, phone, role } = req.body;
let user = await User.findOne({ email });
if (user) return res.status(400).json({ error: 'Email already registered' });
const passwordHash = await hashPassword(password);
user = new User({ name, email, passwordHash, phone, role: role || 'user' });
await user.save();
const token = signToken(user);
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
next(err);
}
};


exports.login = async (req, res, next) => {
try {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ error: 'Invalid credentials' });
const ok = await comparePassword(password, user.passwordHash);
if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
const token = signToken(user);
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
next(err);
}
};


exports.me = async (req, res, next) => {
try {
const user = await User.findById(req.user.id).select('-passwordHash');
res.json(user);
} catch (err) {
next(err);
}
};