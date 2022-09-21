import bookModel from  '../models/bookModel.js'

import { } from '../util/validator.js'






//<================================================== delete +============================>

const deleteReview = async (req, res) => {
    try {
      let bookId = req.params.bookId
      let reviewId = req.params.reviewId
  
      if (!ObjectId.isValid(bookId)) return res.status(400).send({ status: false, message: "Enter Valid Book Id." })
      if (!ObjectId.isValid(reviewId)) return res.status(400).send({ status: false, message: "Enter Valid Review Id." })
  
      let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
  
      if (!book) return res.status(404).send({ status: true, message: "Book Does Not Found !!!" })
      let reviews = book.reviews
  
      book = book._id.toString()
  
      let review = await reviewModel.findOneAndUpdate(
        { _id: reviewId, bookId: bookId, isDeleted: false },
        { $set: { isDeleted: true } }
      )
  
      if (!review) return res.status(404).send({ status: true, message: "Review Does Not Found !!!" })
  
      await bookModel.findOneAndUpdate(
        { _id: bookId },
        { reviews: reviews - 1 }
      )
      res.status(200).send({ status: true, message: "Review Deleted !!!" })
  
  
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  }
  



export {deleteReview ,  }