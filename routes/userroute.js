const express = require("express")

const auth = require("../token/usertoken")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const token = require("../token/token")
const Router = express.Router();

const asynchandler = require("express-async-handler")


const nodemail = require("nodemailer")


Router.post("/signup", asynchandler(async(req,res)=>{

const {fullname, password, email, phonenumber} = req.body;
const salt = await bcrypt.genSalt();
const hashpassword = await bcrypt.hash(password, salt);
try{
    await User.create({
        fullname:fullname,
        email:email,
        password: hashpassword,
        phonenumber:phonenumber
    });
    res.json({msg: "Registration successful"})
}
catch(error){
    console.log(Error)
}
}))


Router.post("/signin", asynchandler(async(req,res)=>{
    const { email,  password} = req.body;
    
    try{
      const existinguser = await User.findOne({ email: email})
      if(!existinguser){
        return res.status(404).json({message: "User not found"})
      }
      const matchpassword = await bcrypt.hash(password, existinguser.password)
      if(!matchpassword){
        return res.status(400).json({message: "Invalid credentials"})
      }
      const tokens = jwt.sign({ email: existinguser.email, id: existinguser._id}, "usersecrets");
      res.status(201).send({ msg:"Login successful", token: tokens})
    } 
    catch(error){
        console.log(error)
        res.status(500).json({msg: "Something went wrong"});
    
    }
    
    }))
    
    Router.put("/user/update", auth.userGuard, asynchandler(async(req,res)=>{
      console.log(req.body)
      const fullname = req.body.fullname;
      const email = req.body.email;
      const phonenumber = req.body.phonenumber;
      User.updateOne({_id:req.userInfo._id},
          {fullname:fullname, email:email, phone:phone})
          .then(()=>{
              res.status(201).json({msg:"User updated"})
          })
          .catch((e)=>{
              res.json({msg:"User not updated"})
          })
  }))
   
module.exports = Router;