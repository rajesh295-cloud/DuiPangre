const express = require("express")


const User = require("../models/user")
const bcrypt = require("bcryptjs")

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

    const user = await User.findOne({email: req.body.email});
    if(user){
        if (bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                msg: "Login Successful",
                token: token(user)
           
            })
        }
        else{
            res.status(404).send({msg: "Errors"})
        }
 
    }
    else{
        res.status(401).send({msg: "Invalid Credentials"})
    }
}))


module.exports = Router;