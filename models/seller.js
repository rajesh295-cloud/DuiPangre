const mongoose = require("mongoose")


const sellerSchema = new mongoose.Schema({

    firstname:{
        type:String
    },
    lastname:{
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

const Seller = mongoose.model("Seller", sellerSchema)
module.exports = Seller;

