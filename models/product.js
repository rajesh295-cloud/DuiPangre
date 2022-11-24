const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type: String
    },
    countInStock: { 
        type: Number,
         default: 0, 
         required: true },

    price:{
        type: String,
        required:true
    },
    brand:{
        type:String,
        required:true
    }
    // ProductOwnedby:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Business",
    //     required:true

    // }

    

});


const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;




