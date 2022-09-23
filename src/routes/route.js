const express = require('express');
const router = express.Router();
<<<<<<< HEAD
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
=======
const{createBook, getBookData,getBookById,updateBookById,deleteBookById} = require('../controllers/bookController');
const {authn,authz} = require('../middlewares/auth')
 const {createUser, loginUser} = require('../controllers/userController');
 const { addReview, updateReview, deleteReview } = require('../controllers/reviewController.js')


//*!--------------APIs To Perform CURD Operation------------------

// User API
router.post('/register', createUser)
router.post('/login', loginUser)

//Book API
router.post('/books', createBook)
router.get('/books', getBookData)
router.get('/books/:bookId', getBookById)
router.put("/books/:bookId", updateBookById)
router.delete('/books/:bookId', deleteBookById)

// Review API
router.post('/books/:bookId/review', addReview)
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteReview)


module.exports=router
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
