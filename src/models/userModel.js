const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trime : true
    },
    phoneNumber : {
        type : String,
        required : true,
        unique : true,
        trime : true
    },
    age : {
        type : String,
        required: true, 
        trime : true
    },
    pincode : {
        type : String,
        required : true,
        trime : true
    },
    aadharNumber : {
        type : String, 
        unique : true,
        required : true,
        trime : true
    }, 
    password : {
        type : String, 
        required : true,
        trime : true
    }
},
{timestamps : true})

module.exports = mongoose.model('User', userSchema)

