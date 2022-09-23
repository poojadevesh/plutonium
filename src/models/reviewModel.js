const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const reviewSchema =new mongoose.Schema({
    bookId:{
        type: objectId,
        required: true,
        ref: "Book",
        trim: true
    },
    reviewedBy:{
        type: string,
        required: true,
        default: "Guest",
        trim: true
    },
    reviewAt:{
        type: Date,
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review:{
        type: string,
        optional: true,
        trim: true
    },
    isDeleted:{
        type: boolean,
        default: false
    },
});

module.exports = mongoose.model("Review",reviewSchema);