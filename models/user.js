const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    
    fullname:{
        type: String

    },
    phonenumber:{
        type:String,
        unique: true
    },
    email:{
        type:String,
        unique:true
        

    },

    password:{
        type:String
    }
    



});

const User = mongoose.model("User", userSchema)
module.exports = User;


