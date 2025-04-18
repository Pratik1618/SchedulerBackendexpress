const express = require('express');
const User = require('../model/user')
const router = express.Router();


router.post('/register', async (req, res) => {
    const { name, email, password, role, number } = req.body;

    if (!name || !email || !password || !role || !number) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    try{
        const newUser = new User({
            name,
            email,
            password,
            role,
            number
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                number: newUser.number
            }
        });
    }catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).send({
                message: 'Validation failed',
                errors: messages
            });
        }
    
       
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).send({ 
                message: `Duplicate value: ${field} already exists`
            });
        }
    
        res.status(500).send({ message: error.message || 'Server error' });
    }

})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({},'-password'); // or add ', "-password"' to exclude password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;