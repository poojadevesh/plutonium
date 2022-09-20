import mongoose from 'mongoose'

<<<<<<< HEAD
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}



module.exports={isValid,  }
=======
// ------------dataValidation-----------
const dataValidation = (data) => {
    if (Object.keys(data).length != 0 )
        return true
    return false
}

//--------------------mongoDbId------------------------
const isValidObjectId = (mongoDbObjId) => {
    return mongoose.Types.ObjectId.isValid(mongoDbObjId)
};

//-----------------------phone-------------------------
const isValidPhone = (mobile) => {
    const ph = mobile.trim()
    if (typeof ph == "string" && ph.match(/^[ 0-9 ]{10,10}$/))
        return true
    return false
}
// -----------------------------------email-------------------------------------
const isValidEmail = (email) => {
    if (typeof email == "string" && email.match(/^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/))
        return true
    return false
}

//--------------------------------------password----------------------------------------
const isValidPass = (password) => {
    const regx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,99}$/.test(password)
    return regx
};

//-----------------isValidTitleEnum--------------------
const isValidTitleEnum = (title) => {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
};

//---------------------------------------validText-------------------------------------------
const isValidText = (text) => {
    if (typeof text == "string" && text.trim().length != 0 && text.match(/^[a-zA-Z.]{2,}$/i))
        return true
    return false
}

//----------------------------------------name--------------------------------------------
const isValidName = (name) => {
    if ((typeof name == "String" && name.trim().length != 0 || name.match(/^[A-Za-z]{2,}$/)))
        return true
    return false
};
//-------------------------------reviews----------------------------
const isValidReviews = (review) => {
    const rev = review.trim()
    if (typeof rev == "Number" && rev.match(/^[ 0-9 ]{1,1}$/))
        return true
    return false
}
//-------------------------------ISBN----------------------------
const isValidIsbn = (value) => {
    const isbn = value.trim()
    if (typeof isbn == "string" && isbn.match(/^[ 0-9_- ]{13,13}$/))
        return true
    return false
}
export { dataValidation, isValidObjectId, isValidPhone, isValidEmail, isValidPass, isValidTitleEnum, isValidText, isValidName, isValidReviews, isValidIsbn  }

>>>>>>> ae6a6154e3852269f37cc37d94453ddf4d161fff
