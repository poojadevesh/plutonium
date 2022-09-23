const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const bookSchema = new mongoose.SchemaTypes({
    title: {
        type: string,
        required: true,
        unique: true,
        trim: true
    },

    excerpt: {
        type: string,
        required: true,
        trim: true
    },

    userId: {
        type: ObjectId,
        required: true,
        ref: "User"

    },
    ISBN: {
        type: string,
        required: true,
        unique: true

    },

    category: {
        type: string,
        required: true,
        trim: true
    },

    subcategory: {
        type: string,
        required: true,
        trim: true
    },

    reviews: {
        type: Number,
        default: 0  // holds the number of reviews of this book
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true,
    }


}, { timestamps: true });




modulle.exports = mongoose.model("Book52", bookSchema);
