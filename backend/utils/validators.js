const { body } = require('express-validator');


const registerValidator = [
body('name').notEmpty().withMessage('Name required'),
body('email').isEmail().withMessage('Valid email required'),
body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];


const loginValidator = [
body('email').isEmail(),
body('password').notEmpty()
];


module.exports = { registerValidator, loginValidator };