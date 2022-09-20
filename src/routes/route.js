import express from 'express'
const router = express.Router()
import { createBook } from '../controllers/bookController.js'

router.post('/books', createBook)

export default router