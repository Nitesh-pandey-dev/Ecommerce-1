const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    username:{
        type:String
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Shipped","Delivered","Not Process","Cancel"]
    }
},{timestamps:true});
module.exports = mongoose.model('order',orderSchema)