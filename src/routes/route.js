import express from 'express'
const router = express.Router()
import { createBook } from '../controllers/bookController.js'

router.post('/books', createBook)


router.post('/createUser',createUser)

export default router