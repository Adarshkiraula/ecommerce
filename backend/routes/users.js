var express = require('express');
var router = express.Router();
var multer = require('multer');
var UserController = require('../controller/userController');
var UserAuthController = require('../auth/userverify');

var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename: function(req,file,cb){
    cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {

      cb(null, true);
  } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',upload.single('profile_pic'),UserController.register);  //User Registration
router.post('/login',UserController.login); //User Login
router.get('/getcategory',UserAuthController.verifyToken,UserController.getcategory); //Get Category
router.get('/getsubcategory',UserAuthController.verifyToken,UserController.getsubcategory); //Get SubCategory
router.get('/getproduct',UserAuthController.verifyToken,UserController.getproduct); //Get Product
router.post('createorder',UserAuthController.verifyToken,UserController.createorder); //Create Order

module.exports = router;
