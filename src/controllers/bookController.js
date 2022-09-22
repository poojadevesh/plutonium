const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const { default: mongoose } = require("mongoose");



const {isValidRating, dataValidation, isValidObjectId, isValidPhone,isValidEmail,isValidPass,isValidTitleEnum,
isValidText, isValidName, isValidReviews, isValidISBN, isValidDate} = require('../validation/bookValidation')

    
//------------------Post Api-----createBook----------------------------//

const createBook = async (req, res)=>{
    try{
        const data = req.body

        const { title, excerpt, ISBN, category, subcategory, userId} = data;

        if(!isValidObjectId(title)){ return res.status(400).send({status:false, message : "title is mandatory"})}

        if(!isValidObjectId(excerpt)){ return res.status(400).send({status:false, message : "excerpt is mandatory"})}

        if(!isValidObjectId(ISBN)){ return res.status(400).send({status:false, message : "ISBN is mandatory"})}

        if(!isValidObjectId(category)){ return res.status(400).send({status:false, message : "category is mandatory"})}

        if(!isValidObjectId(subcategory)){ return res.status(400).send({status:false, message : "subcategory is mandatory"})}
        
    const savedData = await bookModel.create(data)
    res.status(201).send({status:true, data:savedData, message : "successfully created"}) 
    } catch(error){
        res.status(500).send({status:false, message: error.message})
    }
}


//------------------get-Api----------getBookData----------------------//

const getBookData = async function (req, res) {
    try {
        let data = req.query
        let filter = { isDeleted: false, ...data };

        if (req.query.hasOwnProperty('userId')) {
            if (!validator.isValidObjectId(req.query.userId)) return res.status(400).send({ status: false, message: "please enter the valid UserId...!" })
        }

        let findBooks = await bookModel.find(filter).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, _id: 1 }).sort({ title: 1 })
        if (!findBooks) return res.status(404).send({ status: false, msg: "No Book found" })
        if (findBooks.length == 0) return res.status(404).send({ status: false, msg: "please enter existing Book" })

        return res.status(200).send({ status: true, message: 'Books list', data: findBooks })

    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }); }
};

module.exports = {createBook, getBookData}