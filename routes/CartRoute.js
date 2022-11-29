const express = require("express")
const Cart = require("../models/cart")
const auth = require("../token/usertoken")


const Router = express.Router();




Router.post("/add-to-cart", auth.userGuard, async(req, res) =>{



    
}

);

module.exports = Router