const express = require("express")


const User = require("../models/user")
const bcrypt = require("bcryptjs")

const token = require("../token/token")
const Router = express.Router();

const asynchandler = require("express-async-handler")

Router.post("/signup", asynchandler(async(req,res)=>{

    const user = new User({

        fullname:req.body.fullname,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        password: bcrypt.hashSync(req.body.password,10)
    })

    const createdUser = await user.save();

    res.send({
        message: "User Registration Successful",
        token: token(createdUser)
    })

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
 
    }
    else{
        res.status(401).send({msg: "Invalid Credentials"})
    }
}))


module.exports = Router;