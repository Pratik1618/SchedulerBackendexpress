const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
   clientName:{
    type: String,
    required:true,
    set:(v)=>v.toUpperCase(),
    trim:true,
   } 
})


module.exports = mongoose.model('Client', clientSchema);