const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({

 Businessid:{
    required:true,
    ref: "Business"
 },


 User:{
    required:true,
    ref: "User"
 },
 Date:{
    required: true,
    type: Date
 },
 Time:{
    type: TimeRanges
 }
    
})


const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;