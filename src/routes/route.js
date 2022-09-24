const express = require('express')
const router = express.Router()

const { createUser, userLogin } = require('../controllers/userController.js')
const { createBook, getBooksQuery, getBookById, updateBookById,deleteBookById} = require('../controllers/bookController.js')
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController.js')
const {authentication,authorization} = require('../middlewares/auth.js')

// User API
router.post('/register', createUser)
router.post('/login', userLogin)

//Book API
router.post('/books', authentication,createBook)
router.get('/books',authentication,getBooksQuery)
router.get('/books/:bookId',authentication, getBookById)
router.put("/books/:bookId",authentication,authorization, updateBookById)
router.delete('/books/:bookId', authentication,authorization,deleteBookById)

// Review API
router.post('/books/:bookId/review', addReview)
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteReview)

module.exports= router