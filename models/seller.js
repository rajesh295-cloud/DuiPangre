const mongoose = require("mongoose")


const sellerSchema = new mongoose.Schema({



    fullname: {
        type: String,
        required: true
    },
    
    phonenumber:{
        type:String,
        unique: true
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
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type: String,
        required:true
    }
   



});

const Seller = mongoose.model('Seller', sellerSchema)
module.exports = Seller;

