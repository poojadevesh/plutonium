import bookModel from '../models/bookModel.js'
import userModel from '../models/userModel.js'
import { } from '../util/validator.js'


const createBook = async (req, res) => {
    try {
        const reqBody = req.body
        const { title, excerpt, userId, ISBN, category, subcategory, reviews } = reqBody
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


title: { type: String, required: true, unique: true, trim: true },
excerpt: { type: String, required: true, trim: true },
userId: { type: ObjectId, required: true, ref: 'User' },
ISBN: { type: String, required: true, unique: true, trim: true },
category: { type: String, required: true, trim: true },
subcategory: [{ type: String, required: true }],
    reviews: { type: Number, default: 0 },

title, excerpt, ISBN
userId

export { createBook }