import express from 'express'
import { createUser,userLogin } from '../controllers/userController.js'
import { createBook,getBooksByQuery, getBook,deleteBook } from '../controllers/bookController.js'
import {addReview} from '../controllers/reviewController.js'
const router = express.Router()

// User API
router.post('/register',createUser)
router.post('/login',userLogin)

//Book API
router.post('/books', createBook)
router.get('/books', getBooksByQuery)
router.get('/books/:bookId', getBook)
router.delete('/books/:bookId', deleteBook)
// router.delete('/books/:bookId/review:reviewId', updateReview)


// Review API
router.post('/books/:bookId/review',addReview)


export default router
