const express = require("express")

const Business = require("../models/business")


const Router = express.Router();
const auth = require("../token/auth")

const Seller = require("../models/seller")




Router.post("/addbusiness", auth.sellerGuard, async(req,res)=>{

    try{
        const business = new Business({
            Businessname:req.body.Businessname,
            BusinessPhonenumber: req.body.BusinessPhonenumber,
            BusinessAddress: req.body.BusinessAddress,
            
         });
         const createdProduct = await business.save();
 

         res.send({msg: "Business add successfully"});
        }
        catch(err){
           res.json({msg: "Error adding the Business"})
        }
  

})



Router.delete("/delete_business/:id", auth.sellerGuard, async(req, res) =>{
    try{
        await Business.findByIdAndDelete(req.params.id);
        res.status(200).json("Business's deleted");
     }
     catch(err){
        res.status(500).json(err);
     }
})



Router.get("/name/:id", async(req, res) =>{
    try{
        const business = await Business.findById(req.params.id).sort();
        res.status(200).json(business);
     }
     catch(err){
        res.status(500).json({msg: "Business does not exist"})
     }

})

Router.get("/all", async(req, res) =>{
    try{
        const business = await Business.find().sort();
        res.status(200).json(business);
     }
     catch(err){
        res.status(500).json(err)
     }

    
} )



module.exports = Router;