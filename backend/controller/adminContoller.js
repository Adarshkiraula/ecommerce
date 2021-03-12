module.exports={
    login,
    addcategory,
    viewcategory,
    deletecategory,
    getparticularcategory,
    editcategory,
    addsubcategory,
    viewsubcategory,
    deletesubcategory,
    getparticularsubcategory,
    editsubcategory,
    addproduct,
    viewproduct,
    deleteproduct,
    getparticularproduct,
    editproduct,
    changeproductstatus,
    register,
    getuser,
    changeuserstatus,
    getparticularuser,
    edituser,
    createorder,
    postmessage,
    getmessage
}

const AdminModel = require('../model/adminSchema');  // Admin Model
const CategoryModel = require('../model/categorySchema');  // Category Model
const SubCategoryModel = require('../model/subcategorySchema'); // Sub Category Model
const ProductModel = require('../model/productSchema'); // Product Model
const UserModel = require('../model/userSchema');  // User Model
const OrderModel = require('../model/orderSchema'); // Order Model
const MessageModel = require('../model/messageSchema'); // Message Model
const generator = require("generate-password");
let Mail = require("./sendMailController");
require('dotenv').config();
const jwt = require('jsonwebtoken');




// Admin Login
async function login(req,res){
    let email= req.body.email;
    let pswd= req.body.pswd;
    console.log(email + pswd);
    AdminModel.findOne({'email':email}).then((data)=>{
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
                    error:"Wrong Password or Admin Not Found"
                })
            }
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({
            error:"Wrong Password or Admin Not Found"
        })
    })
}

// Admin Add Category
async function addcategory(req,res){
    try{
        let category = new CategoryModel({
            cat_name:req.body.cat_name,
            cat_description:req.body.cat_description,
            image:req.file.filename
        })
        category.save().then((data)=>{
            console.log(data);
            res.status(200).json({
                success:true,
                message:"Category Added Successfully",
                result:data
            })
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json({
                error:err
            })
        })
    }
    catch(err) {
        res.status(400).json({
            error:err
        })
    }
}


// View Category
async function viewcategory(req,res){
    try{
        let category = await CategoryModel.find({is_deleted:false});
        if(category){
            console.log(category);
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
        console.log(err);
        res.status(400).json({
            error:err
        })
    }
}


// Delete Category(Soft Delete)
async function deletecategory(req,res){
    try{
        let c_id=req.params.id;
        console.log(c_id);
        let cat={
            is_deleted:true
        }
        let category = await CategoryModel.findByIdAndUpdate({'_id':c_id},cat,{new:true});
        if(category){
            res.status(200).json({
                success:true,
                message:"Category Deleted Successfully",
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

// Get Particular Category
async function getparticularcategory(req,res){
    try{
        let c_id=req.params.id;
        console.log(c_id);
        let category = await CategoryModel.findById(c_id);
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

// Edit/Update Category
async function editcategory(req,res){
    try{
        let _id=req.body._id;
        console.log(_id);
        let cat={
            cat_name:req.body.cat_name,
            cat_description:req.body.cat_description,
            image:req.file.filename
        }
        let category = await CategoryModel.findByIdAndUpdate(_id,cat,{new:true});
        if(category){
            res.status(200).json({
                success:true,
                message:"Category Updated Successfully",
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
        console.log(err);
        res.status(400).json({
            error:err
        })
    }

}

// Add SubCategory
async function addsubcategory(req,res){
    try{
        let subcategory = new SubCategoryModel({
            category_id:req.body.cat_id,
            subcat_name:req.body.subcat_name,
            subcat_description:req.body.subcat_description,
            image:req.file.filename
         })
         subcategory.save().then((data)=>{
             console.log(data);
             res.status(200).json({
                success:true,
                message:"Sub Category Added Successfully",
                result:data
             })
         })
         .catch((err)=>{
            console.log(err);
            res.status(400).json({
                error:err
            })
        })
    }
    catch(err) {
        res.status(400).json({
            error:err
        })
    }

}


// View SubCategory
async function viewsubcategory(req,res){
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



// Delete SubCategory
async function deletesubcategory(req,res){
    try{
        let sc_id= req.params.id;
        console.log(sc_id);
        let subcat={
            is_deleted:true
        }
        let subcategory = await SubCategoryModel.findByIdAndUpdate({'_id':sc_id},subcat,{new:true});
        if(subcategory){
            res.status(200).json({
                success:true,
                message:"SubCategory Deleted Successfully",
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

// Get Particular SubCategory
async function getparticularsubcategory(req,res){
    try{
        let sc_id=req.params.id;
        console.log(sc_id);
        let subcategory = await SubCategoryModel.findById(sc_id);
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

// Edit/Update SubCategory
async function editsubcategory(req,res){
    try{
        let _id=req.body._id;
        console.log(_id);
        let subcat={
            subcat_name:req.body.subcat_name,
            subcat_description:req.body.subcat_description,
            image:req.file.filename
        }
        let subcategory = await SubCategoryModel.findByIdAndUpdate(_id,subcat,{new:true});
        if(subcategory){
            res.status(200).json({
                success:true,
                message:"SubCategory Updated Successfully",
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

// Add Product
async function addproduct(req,res){
   try{
    let product = new ProductModel({
        subcategory_id:req.body.subcat_id,
        prod_name:req.body.prod_name,
        prod_description:req.body.prod_description,
        price:req.body.price,
        quantity_in_stock:req.body.quantity_in_stock,
        image:req.file.filename
    })
    product.save().then((data)=>{
        console.log(data);
        res.status(200).json({
            success:true,
            message:"Product Added Successfully",
            result:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({
            error:err
        })
    })
   }
   catch(err) {
       res.status(400).json({
           error:err
       })
   }
}



// View Product
async function viewproduct(req,res){
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



// Delete Product(soft delete)
async function deleteproduct(req,res){
    try{
        let p_id= req.params.id;
        console.log(p_id);
        let pro={
            is_deleted:true
        }
        let product = await ProductModel.findByIdAndUpdate({'_id':p_id},pro,{new:true});
        if(product){
            res.status(200).json({
                success:true,
                message:"Product Deleted Successfully",
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

// Get Particular Product
async function getparticularproduct(req,res){
    try{
        let p_id=req.params.id;
        console.log(p_id);
        let product = await ProductModel.findById(p_id);
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

// Edit/Update Product
 async function editproduct(req,res){
    try{
        let _id = req.body._id;
        console.log(_id);
        let prod={
            prod_name:req.body.prod_name,
            prod_description:req.body.prod_description,
            price:req.body.price,
            quantity_in_stock:req.body.quantity_in_stock,
            image:req.file.filename
        }
        let product = await ProductModel.findByIdAndUpdate(_id,prod,{new:true});
        if(product){
            res.status(200).json({
                success:true,
                message:"Product Updated Successfully",
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

// Product Status Changed
async function changeproductstatus(req,res){
    try{
        let _id = req.body.id;
        let status = req.body.status;
       // console.log(req.body);
        console.log(_id , status);
        let product = await ProductModel.findByIdAndUpdate(_id,{status:status},{new:true});
        if(product){
            res.status(200).json({
                success:true,
                message:`Product Status Changed To ${product.status}`,
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
        console.log(err);
        res.status(400).json({
            error:err
        })
    }
}

// User Registration by Admin
async function register(req, res) {
    try {
        let pswd = generator.generate({
            length: 10,
            numbers: true
        })
        let user = new UserModel({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            pswd:pswd,
            phone_number:req.body.phone_number,
            address:req.body.address,
            country:req.body.country,
            state:req.body.state,
            city:req.body.city,
            zip_code:req.body.zip_code,
            profile_pic:req.file.filename
        });
        let result = await user.save();
        if (result) {
            let MailData = {
                receiver: result.email,
                subject: `Registration `,
                html: `<h1>Thanks.. For Choosing Us.! Your Registration Has Been Successfully Done <br> Email: ${result.email} <br>Password: ${pswd}</h1> `,
            }
            let Mail_Confirmation = await Mail.sendEmail(MailData);
            if (Mail_Confirmation) {
                res.status(200).json({
                    success: true,
                    message: `User Saved and Password is send to email`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "User Saved But Error in Sending Mail please Forgot password to login",
                });
            }
        } else {
            res.status(401).json({
                error:"User Already Exist"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error:err
        })
    }
}
// async function register(req,res){
//     try{
//      let user = new UserModel({
//          first_name:req.body.first_name,
//          last_name:req.body.last_name,
//          email:req.body.email,
//          pswd:req.body.pswd,
//          phone_number:req.body.phone_number,
//          address:req.body.address,
//          country:req.body.country,
//          state:req.body.state,
//          city:req.body.city,
//          zip_code:req.body.zip_code,
//          profile_pic:req.file.filename
//      })
//      user.save().then((data)=>{
//          console.log(data);
//          res.status(200).json({
//              success:true,
//              message:"User Registered Successfully",
//              result:data
//          })
//      })
//      .catch((err)=>{
//          console.log(err);
//          res.status(401).json({
//              error:"User Already Exist"
//          })
//      })
//     }
//     catch(err) {
//         res.status(400).json({
//             error:err
//         })
//     }
//  }


 // Get Users
 async function getuser(req,res){
     try{
         let user = await UserModel.find({});
         if(user){
             res.status(200).json({
                 success:true,
                 message:"User Viewed Successfully",
                 result:user
             })
         }
         else{
             res.status(401).json({
                 error:"User Not Found"
             })
         }
     }
     catch(err) {
         res.status(400).json({
             error:err
         })
     }
 }

 //  User Status Change
 async function changeuserstatus(req,res){
     try{
         let _id = req.body.id;
         let status = req.body.status;
         console.log(_id , status);
         let user = await UserModel.findByIdAndUpdate(_id,{status:status},{new:true});
         if(user){
             res.status(200).json({
                 success:true,
                 message:`User Status Changed To ${user.status}`,
                 result:user
             })
         }
         else{
             res.status(401).json({
                 error:"User Not Found"
             })
         }
     }
     catch(err) {
         res.status(400).json({
             error:err
         })
     }
 }


 // Get Particular User
 async function getparticularuser(req,res){
     try{
         let u_id = req.params.id;
         console.log(u_id);
         let user = await UserModel.findById(u_id);
         if(user){
             res.status(200).json({
                 success:true,
                 message:"User Viewed Successfully",
                 result:user
             })
         }
         else{
             res.status(401).json({
                 error:"User Not Found"
             })
         }
     }
     catch(err) {
         res.status(400).json({
             error:err
         })
     }
 }

 // Edit/Update User
 async function edituser(req,res){
     try{
         let _id = req.body._id;
         console.log(_id);
         let user={
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            phone_number:req.body.phone_number,
            address:req.body.address,
            country:req.body.country,
            state:req.body.state,
            city:req.body.city,
            zip_code:req.body.zip_code,
            profile_pic:req.file.filename
         }
         let User = await UserModel.findByIdAndUpdate(_id,user,{new:true});
         if(User){
             res.status(200).json({
                 success:true,
                 message:"User Updated Successfully",
                 result:User
             })
         }
         else{
             res.status(401).json({
                 error:"User Not Found"
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

async function postmessage(req,res){
    try{
         let message = new  MessageModel({
             message: req.body.message
         })
         message.save().then((data)=>{
            console.log(data);
            res.status(200).json({
                success:true,
                message:"Message Added Successfully",
                result:data
            })
         })
         .catch((err)=>{
             console.log(err);
             res.status(400).json({
                error:err
            })
         })
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
           error:err
       })
    }
}

async function getmessage(req,res){
    try{
        // let message = await MessageModel.countDocuments({});
         let message = await MessageModel.find({}).count();
         if(message){
             console.log(message);
             res.status(200).json({
                 success:true,
                 message:"Message Viewed Successfully",
                 result:message
             })
         }
         else {
            res.status(401).json({
                error: "Message Not Found"
            })
         }
    }
    catch(err){
        res.status(400).json({
            error: err
        })
    }
}