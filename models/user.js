const mongoose = require("mongoose")
const { productSchema } = require("./product");

const userSchema = new mongoose.Schema({

    
    fullname:{
        type: String,
        unique: true,
        required:true

    },
    phonenumber:{
        type:Number,
        unique: true,
        required:true
    },
    email: {
        required: true,
        type: String,
        unique:true,
        max: 50,
    },
     img:{
        type: String
     }
, 
    password:{
        type:String,
        required:true
    },

    confirmpassword:{
        type:String,
        required:true
    },

    usertype:{
        default: "User"
    }



 


});

const User = mongoose.model("User", userSchema)
module.exports = User;


