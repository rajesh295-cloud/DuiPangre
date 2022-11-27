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
    email:{
        type:String,
        required:true,
        unique:true
        

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

