import mongoose  from "mongoose"

//isValidObjId
const isValidObjectId = (ObjectId)=>{
    return mongoose.Types.ObjectId.isValid(ObjectId)
 }

//isValidReview
const isValidRating= (rating)=>{
    let value = /^([1-5]|1[05])$/
    if(value.test(rating))
    return false
    return true
}

 export{isValidObjectId,isValidRating}