const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./router/auth');
const protectedRoutes = require('./router/protected');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});