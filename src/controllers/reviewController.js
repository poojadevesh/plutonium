import bookModel from '../models/bookModel.js'
import review from '../models/reviewModel.js'

import {isValidObjectId} from '../util/userValidate.js'

const addReview = async(req,res)=>{
    try{ 
        let id = req.params.bookId

        let datas = req.body

        let{reviewedBy,rating,review} = datas

        if(!isValidObjectId(id))
        return res.status(400).send({status:false,message:`The BookId is Invalid`})

        if(!reviewedBy)
        return res.status(400).send({status:false,message:`The Reviewer Name is Required`})

        if(!rating)
        return res.status(400).send({status:false,message:`The Rating Field is Required`})

        if(!review)
        return res.status(400).send({status:false,message:`The review Field is Required`})

        if(isValidReview(review))
        return res.status(400).send({status:false,message:`The review rating should be 0 to 5)`})

        




         let book = await bookModel.findOneAndUpdate({_id:id},{$inc:{reviews:1}},{new:true})
 
        if(book.isDeleted == true)
        return res.status(404).send({status:false,message:`The book ${book.title} is Deleted `})

        datas.bookId = id
        let result = await review.create(datas)
        
 
         res.status(201).send({status:true,message:"Review Added Sucessfully",data:result})     
    
 } catch(err){
     return res.status(500).send({status:false,message:err.message})
 }}






//<================================================== delete +============================>






//============================================================================================================================



// ### PUT / books /: bookId / review /: reviewId
// - Update the review - review, rating, reviewer's name.
// - Check if the bookId exists and is not deleted before updating the review.Check if the review exist before updating the review.Send an error response with appropirate status code like[this](#error - response - structure) if the book does not exist
// - Get review details like review, rating, reviewer's name in request body.
// - Return the updated book document with reviews data on successful operation.The response body should be in the form of JSON object like[this](#book - details - response)


//----------------------------------------updateReview----------------------------------------------
// SHAYAN BISWAS
// const updateReview = async (req, res) => {
//     try { }
//     catch (err) {
//         res.status(500).send({ status: false, error: err.message })
//     }
// }

      




export { addReview }
