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
     Businessownedby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
     }
})



const Business = mongoose.model("Business", BusinessSchema)
module.exports = Business;
