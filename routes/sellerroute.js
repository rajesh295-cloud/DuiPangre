const express = require("express")
const Seller = require("../models/seller")
const bcrypt = require("bcryptjs")


const sellertoken = require("../token/sellertoken")

const Router = express.Router();

const asynchandler = require("express-async-handler")



Router.post("/seller/signup", asynchandler(async(req,res)=>{

    const seller = new Seller({

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        password: bcrypt.hashSync(req.body.password,10)
    })

    const createdSeller = await seller.save();

    res.send({
        message: "seller Registration Successful",
        token: sellertoken(createdSeller)
    })

}))




Router.post("/seller/signin", asynchandler(async(req,res)=>{

    const seller = await Seller.findOne({email: req.body.email});
    if(seller){
        if (bcrypt.compareSync(req.body.password, seller.password)){
            res.send({
                msg: "seller Login Successful",
                token: sellertoken(seller)
            })
        }
 
    }
    else{
        res.status(401).send({msg: "Invalid Credentials"})
    }
}))


module.exports = Router;