// Order Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let OrderSchema = new Schema({
   
    product:[{
        product_id:{type:Schema.Types.ObjectId,ref:'Product'},
        quantity:{type:Number},
        price:{type:Number}

    }],
    user_id:{type:Schema.Types.ObjectId,ref:'User'},
    total_price:{type:Number},
    address:{
        street: {type:String},
        country: {type:String},
        state: {type:String},
        city: {type:String},
        zip_code: {type:Number}
    },
    order_status:{
        type:String,
        enum:['Ordered','Shipped','Delivered']
    },
    payment_id:{type:Schema.Types.ObjectId,ref:'Payment'},
    payment_status:{
        type:String,
        enum:['Success','Failed']
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Order",OrderSchema);