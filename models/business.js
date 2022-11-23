const mongoose = require("mongoose")
const Seller = require("./seller")

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
     BusinessOwnedby:{

        type: mongoose.Schema.Types.ObjectId,
        ref: Seller


     }
})



const Business = mongoose.model("Business", BusinessSchema)
module.exports = Business;
