const authorModel =require("../models/authorModel")
const bookModel = require("../models/bookModel")

const createAuthor =async function(req,res){
   let data =req.body
   let authorId =data.authorId
   if(!authorId){
      return res.send({status:false,msg:"author id must be present"})
   }
   let savedData =await authorModel.create(data)
   res.send({msg:savedData})
}

const listBooks =async function (req,res){
    let findauthor =await authorModel.find({authorName:"Chetan Bhagat"})
    let findbook =await bookModel.find({authorId:{$eq:findauthor[0].authorId}})
    res.send({msg:findbook})
}

const updateBook =async function (req,res){
    let bookprice =await bookModel.findOneAndUpdate({bookName:"Two states"},{$set:{price:100}},{new:true})
    let updateprice =bookprice.price
    let authorupdate =await authorModel.find({authorId:{$eq:bookprice.authorId}}).select({authorName:1,_id:0})
    res.send({authorupdate,updateprice})
}

const bookrange =async function (req,res){
   let range =await bookModel.find({price:{$gte:50,$lte:100}})
   let a =range.map(x =>x.authorId);
   let newrange=await authorModel.find({authorId:a}).select({authorName:1,_id:0})
 res.send(newrange)
}


module.exports.bookrange=bookrange

module.exports.createAuthor =createAuthor
module.exports.listBooks =listBooks
module.exports.updateBook=updateBook