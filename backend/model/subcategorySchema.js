// Sub Category Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubCategorySchema = new Schema({
   
    category_id: {type:Schema.Types.ObjectId,ref:'Category'},
    subcat_name: {type:String},
    subcat_description: {type:String},
    image: {type:String},
    is_deleted: {
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

module.exports=mongoose.model("SubCategory",SubCategorySchema);