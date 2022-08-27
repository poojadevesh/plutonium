const UserModel= require("../models/userModel")

const createUser =async function(req,res){
    let headers =req.headers.isfreeappuser
    console.log(headers)
    let user =req.body
    let newuser = await UserModel.create(user)
    res.send({msg:newuser})
}


module.exports.createUser= createUser
