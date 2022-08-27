const productModel = require("../models/productModel")

const createProduct = async function(req,res){
    let data= req.body
    let newproduct= await productModel.create(data)
    res.send({msg:newproduct})
}
module.exports.createProduct=createProduct