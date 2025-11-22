

// FILE: routes/doctors.js
const express3 = require('express');
const router3 = express3.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middleware/auth');


router3.get('/patients', auth('doctor'), doctorController.getPatients);
router3.get('/patient/:id/progress', auth('doctor'), doctorController.getPatientProgress);


module.exports = router3;