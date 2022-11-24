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



Router.put("/:id", auth.sellerGuard, async(req, res) =>{
   try{
      const updatedProduct = await Product.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         {new: true}
        
      )
      res.status(200).json(updatedProduct);
   }catch(err){
      res.status(500).json(err)
   }

})



Router.delete("/:id", auth.sellerGuard, async(req,res) =>{
   try{
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product's deleted");
   }
   catch(err){
      res.status(500).json(err);
   }


} )

// Gets all Product
Router.get("/", async(req, res) =>{
   try{
      const product = await Product.find().sort();
      res.status(200).json(product);
   }
   catch(err){
      res.status(500).json(err)
   }
})

// Gets a product
Router.get("/find/:id", async(req, res) =>{
   try{
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
   }
   catch(err){
      res.status(500).json(err)
   }

})


module.exports = Router;