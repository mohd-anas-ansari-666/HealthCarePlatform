// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db'); 

// const app = express();
// app.use(express.json());

// // --- Load environment variables ---
// const MONGO_URI = process.env.MONGO_URI;
// const PORT = process.env.PORT || 5000;

// // --- Connect to Mongo ---
// connectDB(MONGO_URI);

// // --- Sample Route ---
// app.get('/', (req, res) => {
//   res.send('Server is running and DB connected');
// });

// // --- Start the Server ---
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');


const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const goalRoutes = require('./routes/goals');
const reminderRoutes = require('./routes/reminders');


const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/goals', goalRoutes);
app.use('/api/v1/reminders', reminderRoutes);


app.get('/', (req, res) => res.json({ ok: true, message: 'Healthcare backend running' }));
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
.then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
.catch(err => console.error(err));