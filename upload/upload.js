const multer = require ("multer");


// const FILE_TYPE_MAP = {
//     "image/jpeg": "jpeg",
//     "image/png": "png",
//     "image/jpg": "jpg",
//   };

//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const isValid = FILE_TYPE_MAP[file.mimetype];
//       if (!isValid) cb(new Error("Invalid file type"), "./uploads");
//       else cb(null,"./uploads"); // path where we upload an image
//     },
//     filename: function (req, file, cb) {
//       const extension = FILE_TYPE_MAP[file.mimetype];
//       cb(null, `IMG-${Date.now()}.${extension}`);
//     },
//   });

//   const upload = multer({
//     storage: storage
//   })


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
module.exports= upload; 