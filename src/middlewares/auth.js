const jwt = require('jsonwebtoken')
const bookModel = require('../models/bookModel')
const { default: mongoose } = require("mongoose");
const isValidObjectId = (ObjectId)=>{
  return mongoose.Types.ObjectId.isValid(ObjectId)
}

//------------------⭐Authentication⭐--------------//

let authn = async (req,res,next)=>{
try{
let  token =  req.headers['x-auth-key']


  if(!token) 
    return res.status(400).send({staus:false,msg:"token is required "})

    let decodedtoken =  jwt.verify(token,"GroupNo55")
    req.decoded = decodedtoken
    
    if(!decodedtoken) 
    return res.status(401).send({status:false,msg:"you are Unauthorized"})

    next()
    }catch(err){
    res.status(500).send({msg:err.message})
} 
}

//--------------------⭐Authorization⭐--------------------//

let authz = async (req,res,next)=>{

   let userId = req.body.userId

   if(!isValidObjectId(userId))
   return res.status(400).send({status:false,msg:"enter the valid userId"})

if(req.decoded.userId != userId)
return res.status(403).send({staus:false,messg:"you are not authorized"})

next()
}

module.exports = {authn,authz}