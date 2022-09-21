import user from  '../models/userModel.js'
import validEmail from 'email-validator'


import {isValidBody,isValidEnum,isValidNumber,isValidPwd, isValidStr} from '../util/userValidate.js'
//By -Richard
const createUser = async (req,res)=>{

    try{
        let body = req.body
        let{ title,name,phone,email,password} = body

        if(isValidBody(body))
        return res.status(400).send({ status: false, message: "Enter user details" });

        if(!title)
        return res.status(400).send({status:false,message:"title is  mandatory"})


        if(isValidEnum(title))
        return res.status(400).send({ status: false, msg: "Title should be of Mr/Mrs/Miss" });


        if(!name)
        return res.status(400).send({status:false,message:"name is  mandatory"})

        if(isValidStr(name))
         return res.status(400).send({ status: false, msg: "name should be only string " });

        if(!phone)
        return res.status(400).send({status:false,message:"phone is  mandatory"})


        if(isValidNumber(phone))
        return res.status(400).send({status:false,message:" please enter 10 digit IND mobile number"})


        let uniquePhoneNo = await user.findOne({phone:phone})
        if(uniquePhoneNo)
        return res.status(400).send({status:false,message:"phoneNo should be  unique"})

        if(!email)
        return res.status(400).send({status:false,message:"email is  mandatory"})

        if(!validEmail.validate(email)) return res.status(400).send({ status: false, msg: `your Email-Id ${email}is invalid` })
        

        let uniqueEmail = await user.findOne({email:email})
        if(uniqueEmail)
        return res.status(400).send({status:false,message:"Email already registred Please Sign-In"})
       
       
        if(!password)
        return res.status(400).send({status:false,message:"password is  mandatory"})

        if(!isValidPwd(password))
        return res.status(400).send({status:false,message:"Password should be minLen 8, maxLen 15 long and must contain one of 0-9,A-Z,a-z & special char"})

       
     let result = await user.create(body)

     return res.status(201).send({status:true,message: "Registration done Successfully",data:result})

}
    catch(err){
        return res.status(500).send({status:false,message:err.message})
}}



//========================POST /login===============================

const userLogin=async (req,res)=>{
const { email, password } = req.body;

if (Object.keys(req.body).length == 0) {
    return res
        .status(400)
        .send({ status: false, message: "Enter Login Credentials." })
}

if (!isValid(email)) {
    return res.status(400).send({ status: false, msg: "Email Required." })
}
if (!isValid(password)) {
    return res.status(400).send({ status: false, msg: "Password Required." })
}

const validateEmail = function (mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
}

if (!validateEmail(email)) {
    return res
        .status(400)
        .send({ status: false, message: "Incorrect Email !!!" })
}

const validatePassword = function (password) {
    if (/^[A-Za-z\W0-9]{8,15}$/.test(password)) {
        return true;
    }
}

if (!validatePassword(password)) {
    return res
        .status(400)
        .send({ status: false, message: "Incorrect Password !!!" })
}

let user = await userModel
    .findOne({ email: email, password: password })
    .select({ _id: 1 })

if (!user) {
    return res.status(401).send({
        status: false,
        message: "Authentication failed!!!, Incorrect Email or Password !!!",
    })
}

let token = jwt.sign(
    {
        userId: user._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor((Date.now() / 1000) + 180 * 60),
    },
    "Room 56"
)
return res
    .status(200)
    .send({ status: true, message: "Login Successfully", token: token });
};



export { createUser,userLogin}

