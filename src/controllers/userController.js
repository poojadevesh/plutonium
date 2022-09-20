import user from  '../models/userModel.js'
import validEmail from 'email-validator'


import {dataValidation,isValidTitleEnum,isValidPass,isValidName} from '../util/validator.js'

const createUser = async (req,res)=>{

    try{
        let data = req.body
        let{ title,name,phone,email,password} = data

        if(!title)
        return res.status(400).send({status:true,message:"title is  mandatory"})

        if(!isValidName(title))
        return res.status(400).send({ status: false, msg: "Title should be string" });

        let emumTitle = ["Mr"," Mrs", "Miss"]
        if(!emumTitle.includes(title))
        return res.status(400).send({ status: false, msg: "Title should be of Mr/Mrs/Miss" });


        if(!name)
        return res.status(400).send({status:true,message:"name is  mandatory"})

        if(isValidName(name))
        return res.status(400).send({ status: false, msg: "name should be string" });

        if(!phone)
        return res.status(400).send({status:true,message:"phone is  mandatory"})

        if(isValidPass(password))
        return res.status(400).send({status:true,message:"Invalid Password"})


        let uniquePhoneNo = await user.findOne({phone:phone})
        if(uniquePhoneNo)
        return res.status(400).send({status:true,message:"phoneNo should be  unique"})

        if(!email)
        return res.status(400).send({status:true,message:"email is  mandatory"})

        if(!validEmail.validate(email)) return res.status(400).send({ status: false, msg: `your Email-Id ${email}is invalid` })

        let uniqueEmail = await user.findOne({email:email})
        if(uniqueEmail)
        return res.status(400).send({status:true,message:"Email already registred Please Sign-In"})
       
       
        if(!password)
        return res.status(400).send({status:true,message:"password is  mandatory"})

       

   let result = await user.create(data)

    return res.status(201).send({status:true,data:result})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }



}
























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
    "Room 36"
)
return res
    .status(200)
    .send({ status: true, message: "Login Successfully", token: token });
};







export { createUser,userLogin}

