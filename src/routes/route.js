import express from 'express'
const router = express.Router()
import { createUser } from '../controllers/userController.js'
//import { createBook } from '../controllers/bookController.js'




//router.post('/books', createBook)


router.post('/createUser',createUser)

export default router