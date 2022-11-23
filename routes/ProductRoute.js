const express = require("express")
const Product = require("../models/product")
const Router = express.Router();
const sellerguard = require("../token/auth")
const upload = require("../upload/upload")


Router.post("/add", sellerguard, upload.single('pic'), async(req,res)=>{
 
})
