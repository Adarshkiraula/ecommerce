var express = require('express');
var router = express.Router();
var multer = require('multer');
var AdminController = require('../controller/adminContoller');
var AdminAuthController = require('../auth/adminverify');

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login',AdminController.login);  //Admin Login
router.post('/addcategory',upload.single('image'),AdminAuthController.verifyToken,AdminController.addcategory); //Add Category
router.get('/viewcategory',AdminAuthController.verifyToken,AdminController.viewcategory); //View(Get) Category
router.delete('/deletecategory/:id',AdminAuthController.verifyToken,AdminController.deletecategory); //Delete Category
router.get('/getparticularcategory/:id',AdminAuthController.verifyToken,AdminController.getparticularcategory); //Get Particular Category
router.put('/editcategory',upload.single('image'),AdminAuthController.verifyToken,AdminController.editcategory); //Edit Category
router.post('/addsubcategory',upload.single('image'),AdminAuthController.verifyToken,AdminController.addsubcategory); //Add SubCategory
router.get('/viewsubcategory',AdminAuthController.verifyToken,AdminController.viewsubcategory); //View(Get) SubCategory
router.delete('/deletesubcategory/:id',AdminAuthController.verifyToken,AdminController.deletesubcategory); //Delete Subcategory
router.get('/getparticularsubcategory/:id',AdminAuthController.verifyToken,AdminController.getparticularsubcategory); //Get Particular SubCategory
router.put('/editsubcategory',upload.single('image'),AdminAuthController.verifyToken,AdminController.editsubcategory); //Edit SubCategory
router.post('/addproduct',upload.single('image'),AdminAuthController.verifyToken,AdminController.addproduct); //Add Product
router.get('/viewproduct',AdminAuthController.verifyToken,AdminController.viewproduct); //View(Get) Product
router.delete('/deleteproduct/:id',AdminAuthController.verifyToken,AdminController.deleteproduct); //Delete Product
router.get('/getparticularproduct/:id',AdminAuthController.verifyToken,AdminController.getparticularproduct); //Get Particular Product
router.put('/editproduct',upload.single('image'),AdminAuthController.verifyToken,AdminController.editproduct); //Edit Product
router.put('/changeproductstatus',AdminAuthController.verifyToken,AdminController.changeproductstatus);  //Product Status Changed

router.post('/register',upload.single('profile_pic'),AdminAuthController.verifyToken,AdminController.register); // User Registration by Admin
router.get('/getuser',AdminAuthController.verifyToken,AdminController.getuser); // Get Users
router.put('/changeuserstatus',AdminAuthController.verifyToken,AdminController.changeuserstatus); // User Status Changed
router.get('/getparticularuser/:id',AdminAuthController.verifyToken,AdminController.getparticularuser); // Get Particular User
router.put('/edituser',upload.single('profile_pic'),AdminAuthController.verifyToken,AdminController.edituser); // Edit User
router.post('/createorder',AdminAuthController.verifyToken,AdminController.createorder); // Create Order

router.post('/postmessage',AdminAuthController.verifyToken,AdminController.postmessage);
router.get('/getmessage',AdminAuthController.verifyToken,AdminController.getmessage); 


module.exports = router;
