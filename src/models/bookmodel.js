const mongoose=require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName:String,
    authorName:String,
    category:{
        type:String,
        enum:["biography","poetry","novels"]
    },
    year:Number
},{timestamps:true})


module.exports=mongoose.model('Book',bookSchema)