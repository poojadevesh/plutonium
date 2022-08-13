const bookModel =require('../models/bookmodel')

const createNewBook = async function(req,res){
     let data = req.body
     let createBook = await bookModel.create(data)
     res.send({msg:createBook})
}

const getAllBook =async function (req,res){
    let allBooks = await bookModel.find()
    res.send({msg:allBooks})
}

module.exports.createNewBook=createNewBook
module.exports.getAllBook =getAllBook