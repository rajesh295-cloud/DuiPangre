const {Before, Given, When, Then }= require("@cucumber/cucumber")
// const chai = require("chai")
// const mocha = require("mocha")
var seller = require("../routes/sellerroute")

var user = require("../routes/userroute")



Then("Signup function", function(String){

    console.log(seller.email)
})