import bookModel from '../models/bookModel.js'
import userModel from '../models/userModel.js'
import { dataValidation, isValidObjectId, isValidPhone, isValidEmail, isValidPass, isValidTitleEnum, isValidText, isValidName, isValidReviews, isValidIsbn } from '../util/validator.js'

// -----------------data present or not or extra in the body-------------------
const createBook = async (req, res) => {
    try {
        const reqBody = req.body
        const { title, excerpt, userId, ISBN, category, subcategory, reviews } = reqBody

        if (!dataValidation(reqBody))
            return res.status(400).send({ status: false, message: 'Please fill the data in the correct way' })
        
        if (!title)
            return res.status(400).send({ status: false, message: 'title isn\'t present' })
        if (!excerpt)
            return res.status(400).send({ status: false, message: 'excerpt isn\'t present' })
        
        if (!userId)
            return res.status(400).send({ status: false, message: 'userId isn\'t present' })
        //---------------------------------finding user------------------------------
        const existUser = await userModel.find({ userId })
        if (!existUser)
            return res.status(400).send({ status: false, message: 'user doesn\'t exits' })
        
        if (!ISBN)
            return res.status(400).send({ status: false, message: 'ISBN isn\'t present' })
        if (!category)
            return res.status(400).send({ status: false, message: 'category isn\'t present' })
        if (!subcategory)
            return res.status(400).send({ status: false, message: 'subcategory isn\'t present' })

        const saveData = await bookModel.create(reqBody)
        res.status(201).send({ status: true, message: 'Book created successfully', data: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.massage })
    }
}



title, excerpt,
userId
category, subcategory
reviews, ISBN






// ### DELETE / books /: bookId / review /: reviewId
//     - Check if the review exist with the reviewId.Check if the book exist with the bookId.Send an error response with appropirate status code like[this](#error - response - structure) if the book or book review does not exist
//         - Delete the related reivew.
// - Update the books document - decrease review count by one




export { createBook }