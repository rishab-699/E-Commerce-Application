const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNo:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: false,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
},{timestamps:true});

module.exports = mongoose.model('users', userSchema);