const mongoose = require('mongoose')
const {Schema} = require("mongoose");
const taskSchema = new mongoose.Schema({
    // _id:Schema.Types.ObjectId,
    title:{type:String,required:true},
    status:{type:String,required:true,default:'new'},
    _isDeleted:{type:Boolean,required:true,default:false},
    _deletedAt:{type:Schema.Types.Mixed,required:true,default:false},
    _createdAt:{type:Number,required:true,default:+new Date()}
})


const taskModel = mongoose.model('tasks',taskSchema)

module.exports = taskModel