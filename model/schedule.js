const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    ticketNo :{type:String,required  :true,unique:true},
    storeId :{type :mongoose.Schema.Types.ObjectId,ref:'Store',required:true},
    technicianId :{type :mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    scheduleType:{
        type:String,
        enum:['inspection','ppm','breakdown','installation'],

        required:true
    },
    scheduleDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['scheduled','sm-approvalpending','zm-approvalpending','completed','cancelled'],
        default:'scheduled'
    }

},{timestamps:true});

module.exports = mongoose.model('Schedule',scheduleSchema);
