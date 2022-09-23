import express from 'express'
const router = express.Router()

import { createUser,userLogin } from '../controllers/userController.js'
import { createBook,getBooksByQuery,getBookById,updateBook,deleteBook } from '../controllers/bookController.js'
import {addReview,deleteReview} from '../controllers/reviewController.js'




// User API
router.post('/register',createUser)
router.post('/login',userLogin)


//Book API
router.post('/books', createBook)
router.get('/books', getBooksByQuery)
router.get('/books/:bookId',getBookById)
router.put("/books/:bookId",updateBook)
router.delete('/books/:bookId', deleteBook)


// Review API
router.post('/books/:bookId/review',addReview)
router.delete("/books/:bookId/review/:reviewId",deleteReview)

export default router
