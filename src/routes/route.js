import express from 'express'
const router = express.Router()
import { createUser,userLogin } from '../controllers/userController.js'
import { createBook, getBook } from '../controllers/bookController.js'
import {addReview} from '../controllers/reviewController.js'


router.post('/createUser',createUser)
router.post('/login',userLogin)


router.post('/books', createBook)
router.get('/books/:bookId', getBook)


// Review API
router.post('/books/:bookId/review',addReview)


export default router