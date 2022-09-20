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







export { createUser}

