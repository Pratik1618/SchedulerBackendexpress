const express = require('express');
const mongoose = require('mongoose');
const Form = require('../model/Form');
const router = express.Router();


router.post('/addForm',async(req,res)=>{

    const {title,fields} = req.body;

    if(!title || !Array.isArray(fields) || fields.length ===0){
        return res.status(400).json({message:'Please fill all required Fields'});
    }
    const missingFieldLabels = fields.filter(field => !field.label || !field.type);
    if (missingFieldLabels.length > 0) {
        return res.status(400).json({ message: 'All form fields must have a label and type' });
    }
    const existingForm = await Form.findOne({title})
    if(existingForm){
        return res.status(409).json({message:'A form with this title already exist'});
    }
    try{
        const form = new Form(req.body);
        const savedForm = await form.save();
        return res.status(201).json({message:'form saved successfully',savedForm})

    } catch(err){
        console.log(error)
        return res.status(500).json({message:'Server error saving form'})
    }
})


router.get('getForms',async (req,res)=>{
    const forms = await Form.find();
    res.json(forms)
})

module.exports = router;