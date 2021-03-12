module.exports={
    register,
    login,
    getcategory,
    getsubcategory,
    getproduct,
    createorder
}

const UserModel = require('../model/userSchema');  // User Model
const CategoryModel = require('../model/categorySchema');  // Category Model
const SubCategoryModel = require('../model/subcategorySchema');  // SubCategory Model
const ProductModel = require('../model/productSchema'); // Product Model
const OrderModel = require('../model/orderSchema'); // Order Model
let Mail = require('./sendMailController'); 
require('dotenv').config();
const jwt = require('jsonwebtoken');

// User Registration
async function register(req,res){
   try{
    let user = new UserModel({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        pswd:req.body.pswd,
        phone_number:req.body.phone_number,
        address:req.body.address,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        zip_code:req.body.zip_code,
        profile_pic:req.file.filename,
    }) 
     let result = await user.save();
     if(result){
         let MailData = {
             receiver:result.email,
             subject:`Registration`,
             html:`<h1>Thanks..for Choosing Us.Your Registration Has Been Successfully Done.</h1>`
         }
         let Mail_Confirmation = await Mail.sendEmail(MailData);
         if(Mail_Confirmation){
             res.status(200).json({
                 success:true,
                 message:"User Registered Successfully And Mail Send"
             })
         }
         else{
            res.status(200).json({
                success:true,
                message:"User Registered Successfully But Error In Sending Mail"
            })
         } 

     }
     else{
         res.status(401).json({
             error:"User Already Exist"
         })

     }
   }
   catch(err) {
       console.log(err);
        res.status(400).json({
        error:err
    })
   }
}

// User Login
async function login(req,res){
    try{
    let email = req.body.email;
    let pswd = req.body.pswd;
    console.log(email + pswd);
    UserModel.findOne({'email':email}).then((data)=>{
        console.log(data);
        data.comparePassword(pswd,(err,isMatch)=>{
            console.log(isMatch);
            if(isMatch){
                jwt.sign({id:data._id,email:data.email},process.env.JSONSECRET,((err,token)=>{
                    if(err){
                        throw new Error('Internal Server Error');
                    }
                    else{
                        res.status(200).json({
                            success:true,
                            message:"Logged In Successfully",
                            token:token
                        })
                    }
                }))
            }
            else{
                console.log(data);
                res.status(400).json({
                    error:"Wrong Password or User Not Found"
                })
            }
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({
            error:"Wrong Password or User Not Found"
        })
    })
    }
    catch(err) {
        console.log(err);
    }
}

// Get Category
async function getcategory(req,res){
    try{
        let category = await CategoryModel.find({is_deleted:false});
        if(category){
            res.status(200).json({
                success:true,
                message:"Category Viewed Successfully",
                result:category
            })
        }
        else{
            res.status(401).json({
                error:"Category Not Found"
            })
        }
    }
    catch(err) {
        res.status(400).json({
            error:err
        })
    }
}

// Get SubCategory
async function getsubcategory(req,res){
    try{
        let subcategory = await SubCategoryModel.find({is_deleted:false}).populate("category_id").exec();
        if(subcategory){
            res.status(200).json({
                success:true,
                message:"SubCategory Viewed Successfully",
                result:subcategory
            })
        }
        else{
            res.status(401).json({
                error:"SubCategory Not Found"
            })
        }
    }
    catch(err) {
        res.status(400).json({
            error:err
        })
    }
}

// Get Product
async function getproduct(req,res){
    try{
        let product = await ProductModel.find({is_deleted:false}).populate("subcategory_id").exec();
        if(product){
            res.status(200).json({
                success:true,
                message:"Product Viewed Successfully",
                result:product
            })
        }
        else{
            res.status(401).json({
                error:"Product Not Found"
            })
        }
    }
    catch(err) {
        res.status(400).json({
            error:err
        })
    }
}

// Create Order
async function createorder(req,res){
    try{
        
    }
    catch(err) {

    }
}