import mongoose from "mongoose";

//isValidBody
const  isValidBody = (object) =>{
    if (Object.keys(object).length > 0) 
      return false
      return true;
};

//isValidStr
const isValidStr= (String) => {
    if (/\d/.test(String)) 
      return true
      return false;
  };

//isValidEnum
const isValidEnum  = (title)=>{
    let enums = ['Mr','Mrs','Miss']
    if(enums.includes(title))
        return false
        return true;
};

//isValidPhoneNumber
const isValidNumber = (phone)=>{
    let validNumber = /^[6-9]{1}[0-9]{9}$/
    if(validNumber.test(phone))
        return false
        return true
};

//isValidPwd
const isValidPwd = (password) => {
    const regx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)
    return regx
};

//isValidObjId
const isValidObjectId = (ObjectId)=>{
   return mongoose.Types.ObjectId.isValid(ObjectId)
}



export {isValidBody,isValidStr,isValidEnum,isValidNumber, isValidPwd,isValidObjectId}

