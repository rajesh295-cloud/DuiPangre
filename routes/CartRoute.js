const express = require("express")
const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const auth = require("../token/usertoken")

const Router = express.Router();


Router.get("/mine", auth.userGuard, (async(req,res)=>{



  const orders = await Cart.find({}).populate('Userid')
  res.send(orders);
}))









Router.post("/add-to-cart", auth.userGuard, async(req, res) =>{

const newcart = new Cart(req.body);
try{
    const savedCart = await newcart.save();
    res.status(200).json(savedCart);
}
catch(err){
    res.status(500).json(err)
}

    
}

);

Router.put("/:id", auth.userGuard, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  Router.delete("/:id", auth.userGuard, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER CART
  Router.get("/find/:userId", auth.userGuard, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL
  
  Router.get("/", auth.userGuard, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = Router