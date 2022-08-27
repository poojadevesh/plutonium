const mongoose =require('mongoose')
const ObjectId =mongoose.Schema.Types.ObjectId
const orderSchema =new mongoose.Schema({
    productId:{
        type: ObjectId,
        ref: "product" 
    },
    userId:{
        type:ObjectId,
        ref:"User"
    },
    Amount:Number,
    date:{
        type:Date,
        default:Date.now
    },
    isFreeAppUser:{
        type:Boolean,
        default:false
    }
},{ timestamps: true })
module.exports=mongoose.model('Orders',orderSchema)