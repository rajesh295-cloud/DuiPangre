const multer = require("multer")
const express = require("express")


const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, "./uploads")
    }

})