import bookModel from '../models/bookModel.js'
import userModel from '../models/userModel.js'
import { dataValidation, isValidObjectId, isValidPhone, isValidEmail, isValidPwd, isValidTitleEnum, isValidText, isValidName, isValidReviews, isValidIsbn } from '../util/userValidate.js'

// -----------------data present or not or extra in the body-------------------
const createBook = async (req, res) => {
    try {
        const reqBody = req.body
        const { title, excerpt, userId, ISBN, category, subcategory, reviews } = reqBody

        //------------------------------body validation-----------------------------------
        if (!dataValidation(reqBody))
            return res.status(400).send({ status: false, message: 'Please fill the data' })

        if (Object.keys(reqBody).length > 7)
            return res.status(400).send({ status: false, message: 'You can\'t add extra field' })
        //------------------------------title validation-----------------------------------
        if (!title)
            return res.status(400).send({ status: false, message: 'title isn\'t present' })

        if (!isValidText(title))
            return res.status(400).send({ status: false, message: 'title isn\'t valid' })
        //------------------------------excerpt validation-----------------------------------
        if (!isValidText(excerpt))
            return res.status(400).send({ status: false, message: 'excerpt isn\'t present' })

        if (!excerpt)
            return res.status(400).send({ status: false, message: 'excerpt isn\'t valid' })

        //---------------------------------userId validation------------------------------
        if (!userId)
            return res.status(400).send({ status: false, message: 'userId isn\'t present' })

        if (!isValidObjectId(userId))
            return res.status(400).send({ status: false, message: 'userId isn\'t valid' })

        //---------------------------------finding user------------------------------
        const existUser = await userModel.find({ userId })
        if (!existUser)
            return res.status(400).send({ status: false, message: 'user doesn\'t exits' })

        //---------------------------------ISBN validation------------------------------
        if (!ISBN)
            return res.status(400).send({ status: false, message: 'ISBN isn\'t present' })
        if (!isValidIsbn(ISBN))
            return res.status(400).send({ status: false, message: 'ISBN isn\'t valid' })

        //---------------------------------category validation------------------------------
        if (!category)
            return res.status(400).send({ status: false, message: 'category isn\'t present' })

        if (!isValidName(category))
            return res.status(400).send({ status: false, message: 'category isn\'t valid' })

        //---------------------------------category validation------------------------------
        if (!subcategory)
            return res.status(400).send({ status: false, message: 'subcategory isn\'t present' })

        if (!isValidName(subcategory))
            return res.status(400).send({ status: false, message: 'subcategory isn\'t valid' })

        //------------------------------------book creation-----------------------------------
        const saveData = await bookModel.create(reqBody)
        res.status(201).send({ status: true, message: 'Book created successfully', data: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.massage })
    }
}





export { createBook }