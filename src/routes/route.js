const express = require('express');
const router = express.Router();
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
