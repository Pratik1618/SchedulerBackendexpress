const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    label:String,
    value:String,

},{_id:false});


const FieldSchema = new mongoose.Schema({
    id:String,
    type:String,
    label:String,
    placeholder:String,
    required:Boolean,
    options:[OptionSchema]

},{_id:false});


const FormSchema = new mongoose.Schema({
    title:String,
    description:String,
    fields:[FieldSchema]
});


module.exports = mongoose.model('Form',FormSchema);