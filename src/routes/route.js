import express from 'express'
const router = express.Router()
import { createUser } from '../controllers/userController.js'
import { createBook } from '../controllers/bookController.js'


router.post('/createUser',createUser)
router.post('/books', createBook)


export default router