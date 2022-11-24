const express = require("express")
const Product = require("../models/product")
const Router = express.Router();
const auth = require("../token/auth")
const upload = require("../upload/upload")


Router.post("/add", auth.sellerGuard, upload.single('img'), async(req,res)=>{
   const newProduct = new Product(req.body);
   const img = req.file.filename;
   try{
    const product = await newProduct.save();
    res.json({msg: "Sucessfully added the product"})

 }
 catch(error){
    res.json({msg: "Error adding the product"})
 }
})

module.exports = Router;