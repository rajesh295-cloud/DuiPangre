const mongoose = require("mongoose")
const sellerSchema = require("./seller")

const BusinessSchema = new mongoose.Schema({
     Businessname:{
        type: String,
        required:true
     },
     BusinessPhonenumber:{
        type:String,
        required:true
     }, 
     BusinessAddress:{
        type: String,
        required:true
     },
     Seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },

})



const Business = mongoose.model("Business", BusinessSchema)
module.exports = Business;
