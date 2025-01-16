const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Enter A Valid Email"]
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    favsport:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        maxLength:[10,'Phone must contain exact 10 digits'],
        minLength:[10,'Phone must contain exact 10 digits'],
    },
    role:{
        type:Number,
        required:true
    }
},{timestamps:true});
module.exports = mongoose.model('user',userSchema);