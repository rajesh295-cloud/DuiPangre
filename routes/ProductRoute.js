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

Router.put('/products/:id', auth.sellerGuard, async (req, res) => {
   try {
     const updatedProduct = await Product.updateOne({ _id: req.params.id},
     { $set: { name: req.body.name,price: req.body.price, desc: req.body.desc, countInStock: req.body.countInStock, brand:req.body.brand }});
     res.status(200).send("updated successfully");} 
     catch (err) {
     res.status(400).json({ message: err.message });
   }
});


Router.put('/product/picture/update',auth.userGuard, upload.single('img'),(req,res)=>{
   console.log(req.file)
   const file = req.file;
   if(req.file==undefined){
       return res.json({msg : "invalid file format"});
   }
   else if (file){
       const fileName= req.file.filename;
       // const basePath = `${req.protocol}://${req.get("host")}/Upload/`;
       const basePath = `${req.protocol}://${'localhost'}:${('90')}/uplaods/`;
       data.image = basePath + fileName;
   }
   const id = req.params.id;
   //const products = await Arena.findOne({ id: req.params.id });
   Product.updateOne({_id : id}, {image : data.image })
   .then(()=>{
       res.json({msg: "Picture updated"})
   })
   .catch((e)=>{
       res.json ({msg :"Please Try again "})
   })
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