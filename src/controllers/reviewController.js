import bookModel from '../models/bookModel.js'
import reviewModel from '../models/reviewModel.js'
import {isValidObjectId,isValidRating} from '../util/reviewValidate.js';

const addReview = async(req,res)=>{
    try{ 
        let id = req.params.bookId

        let datas = req.body

        let{reviewedBy,rating,review} = datas

        if(!isValidObjectId(id))
        return res.status(400).send({status:false,message:`The BookId is Invalid`})
        
        let findBook = await bookModel.findById(id)
        if(!findBook)
        return res.status(400).send({status:false,message:`Book Not Found`})

        if(findBook.isDeleted == true)
        return res.status(404).send({status:false,message:`The book ${findBook.title} is Deleted `})

        if(!reviewedBy)
        return res.status(400).send({status:false,message:`The Reviewer Name is Required`})

        if(!rating)
        return res.status(400).send({status:false,message:`The Rating Field is Required`})

        if(!review)
        return res.status(400).send({status:false,message:`The review Field is Required`})

        if(isValidRating(rating))
        return res.status(400).send({status:false,message:`The review rating should be 0 to 5)`})

        datas.bookId = id
        let result = await reviewModel.create(datas)
        await bookModel.findOneAndUpdate({_id:id},{$inc:{reviews:1}},{new:true})

        let finalOp = await reviewModel.findOne({_id:result._id}).select({isDeleted: 0, createdAt:0, updatedAt: 0,__v:0})

         res.status(201).send({status:true,message:"Review Added Sucessfully",data:finalOp})     
    
 }catch(err){      
     return res.status(500).send({status:false,message:err.message})
 }}


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

 

//<============================================== deleted review =========================>
// by Aj

const deleteReview = async (req, res) => {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!isValidObjectId(bookId)) return res.status(400).send({
            status: false,
            message: "Enter Valid Book Id."
        })
         if (!isValidObjectId(reviewId)) return res.status(400).send({
            status: false,
            message: "Enter Valid Review Id."
        })

        let book = await bookModel.findOne({
            _id: bookId,
            isDeleted: false
        })

        if (!book) return res.status(404).send({
            status: true,
            message: "Book Does Not Found !!!"
        })
        let reviews = book.reviews

        book = book._id.toString()

        let review = await reviewModel.findOneAndUpdate({
            _id: reviewId,
            bookId: bookId,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true
            }
        })

        if (!review) return res.status(404).send({
            status: true,
            message: "Review Does Not Found !!!"
        })

        await bookModel.findOneAndUpdate({
            _id: bookId
        }, {
            reviews: reviews - 1
        })
        res.status(200).send({
            status: true,
            message: "Review Deleted !!!"
        })


    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        });
    }
}





export { addReview , deleteReview}
