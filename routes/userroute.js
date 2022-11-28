const express = require("express")

const auth = require("../token/usertoken")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const token = require("../token/token")
const Router = express.Router();
const emailvalidator = require("email-validator")
const asynchandler = require("express-async-handler")
const upload = require("../upload/upload")

const nodemail = require("nodemailer")


Router.post("/signup", asynchandler(async(req,res, next)=>{

const {fullname, password, email, phonenumber, confirmpassword} = req.body;
const salt = await bcrypt.genSalt();
if(password != confirmpassword){
  throw new Error("Password does not match")
  res.json({msg: "Password does not match" })

}
  
const hashpassword = await bcrypt.hash(password, salt);
const hashedpassword= await bcrypt.hash(confirmpassword, salt);

 
if(emailvalidator.validate(req.body.email)){
  res.status(200).json({msg: "Email is valid"})
  next()


}
 else{
  res.status(400).send('Invalid Email');
  }
try{
  
    await User.create({

        fullname:fullname,
        email:email,
        password: hashpassword,
        phonenumber:phonenumber,
        confirmpassword:hashedpassword
    });
    res.json({msg: "Registration successful"})
}
catch(error){
    res.json({msg: "Invalid Credentials "})
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



Router.put("/update/:id", auth.userGuard, async (req, res) => {
  if (req.body.password) {
    req.body.password = req.params.password
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/user/profile", auth.userGuard,(req,res)=>{


  res.status(201).json(req.userInfo);

})







Router.put('/user/picture/update',auth.userGuard,upload.single('img'),(req,res)=>{
  console.log(req.file)
  if(req.file==undefined){
      return res.json({msg : "invalid file format"});
  }
  const fileName= req.file.filename;
  const basePath = `${req.protocol}://${'localhost'}:${('90')}/uploads/`;
  
  User.updateOne({_id : req.userInfo._id}, {picture : basePath + fileName})
  .then(()=>{
      res.json({msg: "Picture updated"})
  })
  .catch((e)=>{
      res.json ({msg :"Please Try again "})
  })
})








// Router.get("/search/:id", auth.userGuard, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password')
//     if(!user) return res.status(400).json({msg: "User does not exist."})

//     res.json(user)
// } catch (err) {
//     return res.status(500).json({msg: err.message})
// }
// });
module.exports = Router;