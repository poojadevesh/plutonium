const mongoose =require('mongoose')

const productSchema = new mongoose.Schema({
    Name:String,
    Category:String,
    Price:Number
},{ timestamps: true })

module.exports= mongoose.model('product',productSchema)