const mongoose  = require("mongoose")
const moment = require("moment")

const isValidRevDate = (reviewedAt)=>{
    let value = reviewedAt;
let check = moment(value,'YYYY-MM-DD', true).isValid();
        return check
}

const isValidObjectId = (ObjectId)=>{
    return mongoose.Types.ObjectId.isValid(ObjectId)
 }

const isValidRating= (rating)=>{
    let value = /^([1-5]|1[05])$/
    if(value.test(rating))
    return false
    return true
}
 module.exports = {isValidObjectId,isValidRating,isValidRevDate}