const publisherModel= require("../models/publisherModel")

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publihserCreated = await publisherModel.create(publisher)
    res.send({data: publihserCreated})
}


const basicCode =async function(req,res){
    console.log("this is middlwaer")
    res.send({msg:"this is coming from handler"})
}
module.exports.createPublisher= createPublisher
module.exports.basicCode=basicCode