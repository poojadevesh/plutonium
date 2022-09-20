import express from 'express'
const router = express.Router()
import { createUser } from '../controllers/userController.js'
import { createBook, getBook } from '../controllers/bookController.js'


router.post('/createUser',createUser)
router.post('/books', createBook)
router.get('/books/:bookId', getBook)


export default router