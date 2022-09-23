const mongoose = require('mongoose');
<<<<<<< HEAD
const objectId = mongoose.Schema.Types.ObjectId;
const bookSchema = new mongoose.SchemaTypes({
    title: {
        type: string,
=======
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
        required: true,
        unique: true,
        trim: true
    },
<<<<<<< HEAD

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
=======
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: [{
        type: String,
        required: true,
        trim: true
    }],
    reviews: {
        type: Number,
        default: 0
    },
    deletedAt: { type: Date },
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
<<<<<<< HEAD
        required: true,
=======
        required: true
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
    }


}, { timestamps: true });

<<<<<<< HEAD



modulle.exports = mongoose.model("Book52", bookSchema);
=======
module.exports = mongoose.model("Book52", bookSchema);
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
