const express = require("express")
const Seller = require("../models/seller")
const bcrypt = require("bcryptjs")


const sellertoken = require("../token/sellertoken")
const Router = express.Router();

const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken")


Router.post("/seller/signup", asynchandler(async(req,res)=>{


}))




Router.post("/seller/signin", asynchandler(async(req,res)=>{
const { email,  password} = req.body;

try{
  const existinguser = await Seller.findOne({ email: email})
  if(!existinguser){
    return res.status(404).json({message: "User not found"})
  }
  const matchpassword = await bcrypt.hash(password, existinguser.password)
  if(!matchpassword){
    return res.status(400).json({message: "Invalid credentials"})
  }
  const tokens = jwt.sign({ email: existinguser.email, id: existinguser._id}, "anysecrets");
  res.status(201).send({token: tokens})
} 
catch(error){
    console.log(error)
    res.status(500).json({msg: "Something went wrong"});

}

}))




module.exports = Router;