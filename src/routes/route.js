import express from 'express'
const router = express.Router()
import { createUser,userLogin } from '../controllers/userController.js'
import { createBook, getBook,updateBook } from '../controllers/bookController.js'


router.post('/createUser',createUser)
router.post("/login",userLogin)
router.post('/books', createBook)
router.get('/books/:bookId', getBook)
router.put("/books/:bookId",updateBook)


export default router