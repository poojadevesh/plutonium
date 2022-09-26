const  mongoose =  require("mongoose");


const  isValidBody = (object) =>{
    if (Object.keys(object).length > 0) 
      return false
      return true;
};


const isValidStr= (String) => {
    if (/\d/.test(String)) 
      return true
      return false;
  };


const isValidEnum  = (title)=>{
    let enums = ['Mr','Mrs','Miss']
    if(enums.includes(title))
        return false
        return true;
};

const isValidNumber = (phone)=>{
    let validNumber = /^[6-9]{1}[0-9]{9}$/
    if(validNumber.test(phone))
        return false
        return true
};

const isValidPwd = (password) => {
    const regx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)
    return regx
};

const isValidObjectId = (ObjectId)=>{
   return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidEmail = (email) => {
    if (typeof email == "string" && email.match(/^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/))
        return true
    return false
}

module.exports = {isValidBody,isValidStr,isValidEnum,isValidNumber, isValidEmail,isValidPwd,isValidObjectId}