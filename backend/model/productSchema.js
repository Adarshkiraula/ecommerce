// Product Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ProductSchema = new Schema({
   
    subcategory_id: {type:Schema.Types.ObjectId,ref:'SubCategory'},
    prod_name: {type:String},
    prod_description: {type:String},
    image: {type:String},
    status:{
        type:Boolean,
        default:true
    },
    price: {type:Number},
    quantity_in_stock: {type:Number},
    attributes: [{
        key: {type:String},
        value: {type:String}
    }],
    is_deleted:{
        type:Boolean,
        default:false
    }

},
{timestamps:true}
)

module.exports=mongoose.model("Product",ProductSchema);