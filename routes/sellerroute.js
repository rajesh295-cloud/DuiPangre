const express = require("express")
const Seller = require("../models/seller")
const bcrypt = require("bcryptjs")


const auth = require("../token/auth")
const Router = express.Router();

const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


Router.post("/seller/signup", asynchandler(async(req,res)=>{
  const {firstname,lastname, password, email, phonenumber, confirmpassword} = req.body;
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);
  const hashedpassword = await bcrypt.hash(confirmpassword, salt);
  try{
      await Seller.create({
          firstname:firstname,
          lastname: lastname,
          email:email,
          password: hashpassword,
          phonenumber:phonenumber,
          confirmpassword: hashedpassword
      });
      res.json({msg: "Registration successful"})
  }
  catch(error){
      res.json({msg: "Invalid Credentials"})
  }

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
  const tokens = jwt.sign({ email: existinguser.email, id: existinguser._id}, "mysecretkey");
  res.status(201).send({msg:"Login Succesful" , token: tokens})
} 
catch(error){
    console.log(error)
    res.status(500).json({msg: "Something went wrong"});

}

}))



Router.put("/seller/:id", auth.sellerGuard, async (req, res) => {
  if (req.body.password) {
    req.body.password = req.params.password
  }

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSeller);
  } catch (err) {
    res.status(500).json(err);
  }
});




Router.get('/seller/:id', auth.sellerGuard, async (req, res)=> {
  try {
    const seller = await Seller.findById(req.params.id).select('-password')
    if(!seller) return res.status(400).json({msg: "Seller does not exist."})

    res.json(seller)
} catch (err) {
    return res.status(500).json({msg: err.message})
}
});

module.exports = Router;