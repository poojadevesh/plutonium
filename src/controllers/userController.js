import user from  '../models/userModel.js'
import validEmail from 'email-validator'


import {isValidBody,isValidEnum,isValidNumber,isValidPwd, isValidStr} from '../util/validator.js'

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

     return res.status(201).send({status:true,data:result})

}
    catch(err){
        return res.status(500).send({status:false,message:err.message})
}
}

























//========================POST /login===============================







export { createUser}

