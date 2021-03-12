// Category Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
   
    cat_name: {type:String},
    cat_description: {type:String},
    image: {type:String},
    is_deleted: {
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Category",CategorySchema);