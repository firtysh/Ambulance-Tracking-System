const express = require('express');
const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes')
const ambulanceRoutes = require('./routes/ambulanceRoutes')
const cors = require('cors')
const app = express();

app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/hospital',hospitalRoutes)
app.use('/api/ambulance',ambulanceRoutes)

app.get('/', async (_, res) => {
    res.status(200).json({ message: 'Hello from the server side!'});
});


module.exports = app;