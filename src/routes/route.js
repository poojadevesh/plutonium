import express from 'express'
const router = express.Router()
<<<<<<< HEAD
import { createUser,userLogin } from '../controllers/userController.js'
import { createBook, getBook } from '../controllers/bookController.js'
import {addReview} from '../controllers/reviewController.js'
=======
import { createUser } from '../controllers/userController.js'
import { createBook, getBook, deleteBook } from '../controllers/bookController.js'
// import { updateReview } from '../controllers/reviewController.js'
>>>>>>> c0761bf13e9dc8f4f9fd616348cea9cf78d94291


router.post('/createUser',createUser)
router.post('/login',userLogin)


router.post('/books', createBook)
router.get('/books/:bookId', getBook)
router.delete('/books/:bookId', deleteBook)
// router.delete('/books/:bookId/review:reviewId', updateReview)


<<<<<<< HEAD
// Review API
router.post('/books/:bookId/review',addReview)


export default router
=======
export default router
>>>>>>> c0761bf13e9dc8f4f9fd616348cea9cf78d94291
