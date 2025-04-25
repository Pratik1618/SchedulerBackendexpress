const express = require('express');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid email '});
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid  password'});
        }

        const token = jwt.sign({userId:user._id,role:user.role,email:user.email},process.env.JWT_SECRET);
        res.status(200).json({message:'Login successful',token});
    
    
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
})

module.exports = router;