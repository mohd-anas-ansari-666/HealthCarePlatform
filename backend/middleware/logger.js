const morgan = require('morgan');
module.exports = morgan('dev');


// FILE: middleware/errorHandler.js
module.exports = function (err, req, res, next) {
console.error(err);
const status = err.status || 500;
res.status(status).json({ error: err.message || 'Server Error' });
};