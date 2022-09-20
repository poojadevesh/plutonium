import mongoose from "mongoose";
// ----------------dataValidation----------------
const dataValidation = (data) => {
    if (Object.keys(data).length != 0)
        return true
    return false
}

//------------------------------mongoDbId-------------------------------
const isValidObjectId = (mongoDbObjId) => {
    return mongoose.Types.ObjectId.isValid(mongoDbObjId)
};

// ----------------------------------------email------------------------------------
const email = (email) => {
    if (typeof email == "string" && email.match(/^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/))
        return true
    return false
}
//-------------------------------password---------------------------------
const isValidPass = (password) => {
    const regx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,99}$/.test(password)
    return regx
};
//-----------------------------isValidTitleEnum---------------------------
const isValidTitleEnum = (title) => {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
};


export { dataValidation, isValidObjectId, email, isValidPass, isValidTitleEnum }



