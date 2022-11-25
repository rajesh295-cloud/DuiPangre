const jwt = require("jsonwebtoken");
const Seller = require("../models/seller");

module.exports.sellerGuard = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
   const data = jwt.verify(token, 'mysecretkey')
   Seller.findOne({_id : data.seller_id})
   .then((result)=>{
        req.sellerinfo = result;
        next();
   })
   .catch((e)=>{
       res.json({msg : "Invalid token"})
   })
    }
    catch(e){
        res.json({msg : "Invalid access"})
    }
}