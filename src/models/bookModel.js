const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    bookname: String,
    author_id: {
        type: ObjectId,
        ref: "Authors"
    }, 
    price: Number,
    ratings: Number,
    publisher_id:{
       type: ObjectId,
       ref:"publisher"
    },
    isHardcover:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });


module.exports = mongoose.model('Books', bookSchema)
