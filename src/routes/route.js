import express from 'express'
const router = express.Router()
import { createUser } from '../controllers/userController.js'
import { createBook, getBook, deleteBook } from '../controllers/bookController.js'
import { updateReview } from '../controllers/reviewController.js'


router.post('/createUser',createUser)
router.post('/books', createBook)
router.get('/books/:bookId', getBook)
router.delete('/books/:bookId', deleteBook)
router.delete('/books/:bookId/review:reviewId', updateReview)


export default router
