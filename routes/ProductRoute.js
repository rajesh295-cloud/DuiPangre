const express = require("express")
const Product = require("../models/product")
const Router = express.Router();
const auth = require("../token/auth")
const upload = require("../upload/upload")
const asynchandler = require("express-async-handler")


Router.post("/add", auth.sellerGuard, upload.single('img'), async(req,res)=>{
   try{
   const product = new Product({
      name: req.body.name,
      img: req.file.path,
      price: req.body.price,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
      desc: req.body.desc
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
   }
   catch(err){
      res.json({msg: "Error adding the product"})
   }
})

Router.put("product/update/:id", auth.sellerGuard, upload.single("img"), async (req,res)=>{
 
   
   const product = await Product.findById(req.params.id);
   if(!product)
       return res.status(400).send("Invalid product!");
   
   const file = req.file;
   let imagePath;
   
   if(file){
       const fileName = req.file.filename;
       const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
       imagePath = `${basePath}${fileName}`;
   }
   else {
       imagePath = product.img;
   }
   
   const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
       name: req.body.name,
       desc: req.body.desc,
       image: imagePath,
       brand: req.body.brand,
       price: req.body.price,
       countInStock: req.body.countInStock,
   },
   {
       new: true,
   })
   if(!updatedProduct){
       return res.status(500).send('The product cannot be updated!');
   }
   res.status(201).send(updatedProduct);
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
      const product = await Product.findOne(req.params.id);
      res.status(200).json(product);
   }
   catch(err){
      res.status(500).json(err)
   }

})


module.exports = Router;