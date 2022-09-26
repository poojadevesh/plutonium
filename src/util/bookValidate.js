const mongoose = require('mongoose')

const dataValidation = (data) => {
    if (Object.keys(data).length != 0)
        return true
    return false
}

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
};

const isValidPhone = (mobile) => {
    const ph = mobile.trim()
    if (typeof ph == "string" && ph.match(/^[ 0-9 ]{10,10}$/))
        return true
    return false}

const isValidEmail = (email) => {
    if (typeof email == "string" && email.match(/^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/))
        return true
    return false}

const isValidPass = (password) => {
    const regx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,99}$/.test(password)
    return regx};

const isValidTitleEnum = (title) => {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
};

const isValidText = (text) => {
    if (typeof text == "string" && text.trim().length != 0 && text.match(/^[a-z A-Z 0-9,.?]{2,}$/i))
        return true
    return false
}

const isValidName = (name) => {
    if ((typeof name == "string" && name.trim().length != 0 && name.match(/^[A-Z a-z]{2,}$/)))
        return true
    return false
};

const isValidReviews = (review) => {
    const rev = review.trim()
    if (typeof rev == "string" && rev.trim().length != 0)
        return true
    return false
}

const isValidIsbn = (value) => {
    const isbn = value.trim()
    if (typeof isbn == "string" && isbn.match(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/))
        return true
    return false
}

const isValidBody = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

const isValidDate = (date) => {
    const regx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    return regx.test(date)
};

const isValidRating = (rating) => {
    let value = /^([1-5]|1[05])$/
    if (value.test(rating))
        return false
    return true
}
module.exports = { dataValidation,isValidObjectId, isValidPhone, isValidEmail, isValidPass, isValidTitleEnum,
    isValidText, isValidName, isValidReviews, isValidIsbn, isValidBody, isValidDate, isValidRating }