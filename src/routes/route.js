import express from 'express'
const router = express.Router()
import {authentication,authorization}  from  '../middleware/auth.js'

import { createUser, userLogin } from '../controllers/userController.js'
import { createBook, getBooks, getBookById, updateBookById, deleteBookById } from '../controllers/bookController.js'
import { addReview, updateReview, deleteReview } from '../controllers/reviewController.js'


// User API
router.post('/register', createUser)
router.post('/login', userLogin)

//Book API
router.post('/books',authentication,authorization, createBook)
router.get('/books',authentication,authorization, getBooks)
router.get('/books/:bookId', getBookById)
router.put("/books/:bookId", updateBookById)
router.delete('/books/:bookId', deleteBookById)

// Review API
router.post('/books/:bookId/review', addReview)
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteReview)

export default router
