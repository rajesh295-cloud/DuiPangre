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


module.exports = Router;