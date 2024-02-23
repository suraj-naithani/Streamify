const mongoose = require('mongoose');

const URI = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to database');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;
