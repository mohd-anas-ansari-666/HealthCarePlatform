// FILE: routes/patients.js
const express2 = require('express');
const router2 = express2.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');


router2.post('/steps', auth(), patientController.addSteps);
router2.get('/steps/daily', auth(), patientController.getDailySteps);
router2.get('/steps/weekly', auth(), patientController.getWeekly);


module.exports = router2;