const mongoose = require("mongoose")


const sellerSchema = new mongoose.Schema({



    fullname: {
        type: String,
        required: true
    },
    
    phonenumber:{
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
        trim: true,
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
    },
    usertype:{
        type: "String",
        default: "Seller"
    }



});

const Seller = mongoose.model('Seller', sellerSchema)
module.exports = Seller;

