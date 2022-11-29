const mongoose = require("mongoose");
const Product = require("./product");
const User = require("./user");

const CartSchema = new mongoose.Schema({

    Productid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },

    Userid:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'

  },
    quantiy:{
        type:Number,
        required:true
    }



})

const Cart = mongoose.model("Cart", CartSchema)
module.exports = Cart;