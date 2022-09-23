<<<<<<< HEAD
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
=======
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema(
    {
        bookId: { type: ObjectId, required: true, ref: 'Book' },

        reviewedBy: { type: String, required: true, default:'Guest', trim: true },

        reviewedAt: { type: Date,required:true},

        rating: { type: Number, minlength: 1, maxlength: 5, require: true },

        review: { type: String, trim: true },

        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
)
module.exports =  mongoose.model('Review', reviewSchema)
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
