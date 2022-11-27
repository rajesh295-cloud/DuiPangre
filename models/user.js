const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    
    fullname:{
        type: String,
        unique: true,
        required:true

    },
    phonenumber:{
        type:String,
        unique: true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
        

    },
    img:{
        type: String
    },

    password:{
        type:String,
        required:true
    },

    confirmpassword:{
        type:String,
        required:true
    },

 


});

const User = mongoose.model("User", userSchema)
module.exports = User;


