const mongoose = require('mongoose');
require('dotenv').config();  // Import dotenv for environment variables

const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Exit if connection fails
    }
};

module.exports = connectDB;
