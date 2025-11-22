const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;
module.exports = function (roles = []) {
// roles can be a single role string or array
if (typeof roles === 'string') roles = [roles];
return async (req, res, next) => {
try {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
const token = authHeader.split(' ')[1];
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(payload.id).select('-passwordHash');
if (!user) return res.status(401).json({ error: 'Unauthorized' });
if (roles.length && !roles.includes(user.role)) return res.status(403).json({ error: 'Forbidden' });
req.user = user;
next();
} catch (err) {
console.error(err);
return res.status(401).json({ error: 'Invalid token' });
}
};
};