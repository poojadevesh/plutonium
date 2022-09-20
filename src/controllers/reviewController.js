import bookModel from '../models/bookModel.js'

import { } from '../util/validator.js'

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



// export { updateReview }