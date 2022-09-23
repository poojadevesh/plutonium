import jwt from 'jsonwebtoken';
import bookModel from '../models/bookModel.js';
import { isValidObjectId } from '../util/bookValidate.js'

//--------------------------------------authentication--------------------------------------
const authentication = async (req, res, next) => {
    try {
        const token = req.headers["x-api-key"];

        if (!token)
            return res.status(400).send({ status: false, message: 'Token must be present' })

        const decodedToken = jwt.verify(token, 'group56')

        if (!decodedToken)
            return res.status(400).send({ status: false, message: 'Provide your own token' })

        req.user = decodedToken

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//---------------------------------------authorization---------------------------------------
const authorization = async (req, res, next) => {
    try {
        const bookId = req.params.bookId
        console.log(bookId)

        if (!isValidObjectId(bookId))
            return res.status(400).send({ status: false, message: `This ${bookId} bookId is Invalid` });
            
        const token = req.headers["x-api-key"];

        if (!token)
            return res.status(400).send({ status: false, message: 'Token must be present' })

        const decodedToken = jwt.verify(token, 'group56')
        console.log(decodedToken.userId)
        
        if (!decodedToken)
            return res.status(400).send({ status: false, message: 'Provide your own token' })
        
        const book = await bookModel.findById(bookId)
        console.log(book)
        console.log(book.userId)
        
        
        if (decodedToken.userId != book.userId)
            return res.status(400).send({ status: false, message: 'You are not authorized' })

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

export { authentication, authorization }