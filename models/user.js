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
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
          validator: (value) => {
            const re =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return value.match(re);
          },
          message: "Please enter a valid email address",
        },
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

 


});

const User = mongoose.model("User", userSchema)
module.exports = User;


