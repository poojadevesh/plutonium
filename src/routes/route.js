const express = require('express');
const router = express.Router();
const {createUser,login}= require("../controllers/userController")
const {createBook,getBooks,getBooksById,updateBooksById,deleteBooksById} = require("../controllers/bookController")
const {createReview,updateReview,deleteReview} = require("../controllers/reviewController")
const middlewares = require("../middlewares/auth")


// User APIs
router.post("/register",createUser)
router.post("/login",login)


// Book APIs
// router.post("/books",createBook)
// router.get("/books",getBooks)
// router.get("/books/:bookId",getBooksById)
// router.put("/books/:bookId",updateBooksById)
// router.delete("/books/:bookId",deleteBooksById)


// // Review APIs
// router.post("/books/:bookId/review",createReview)
// router.put("/books/:bookId/review/:reviewId",updateReview)
// router.delete("/books/:bookId/review/:reviewId",deleteReview)

module.exports = router;