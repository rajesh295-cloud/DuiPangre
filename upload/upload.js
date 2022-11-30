const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + file.originalname)
    }
})

const filter = (res, file, cb)=>{
    if(file.mimetype == "image/jpg" || file.mimetype == "img/png" || file,cb(null,true)){
        console.log("image uploaded");
    }
    else{
        console.log("image not uploaded");
    }
}

const upload= multer({
    storage:storage,
    filter:filter
});
module.exports = upload;