import review from  '../models/reviewModel.js'

import {isValidObjectId } from '../util/userValidate.js'


const addReview = async(req,res)=>{
    try{

       let id = req.params.bookId

       let datas = req.body

       let book = await review.findOneAndUpdate({_id:id},{$inc:{}})

       datas.bookId = id
       let result = await review.create(datas)
       

        res.status(201).send({status:true,message:"Review Added Sucessfully",data:result})

    
   
} catch(err){
    return res.status(500).send({status:false,message:err.message})
}}




export { addReview }