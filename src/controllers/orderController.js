const orderModel = require("../models/orderModel")
const productModel =require("../models/productModel")
const userModel =require("../models/userModel")

const createOrder =async function(req,res){
    let data =req.body
    console.log(data.amount,"amount")
    let userId =data.userId
    let productId = data.productId
    if(!userId){
        return res.send ({msg:'userId is mandatory'})
    }else if(!productId){
        res.send("please enter productid")
    }

    let UserId =await userModel.findById(userId)
    console.log(UserId,"UserId")
    let ProductId =await productModel.findById(productId)
    if(!UserId){
        return res.send("this user id is not founded")
    }else if(!ProductId){
        return res.send("this product id is not founded")
    }else{ }

let token =req.headers.isfreeappuser 
console.log(token,"token")
let val =0
// if is freeapp user is free
if(token==='true'){
    data.amount=val
    data.isFreeAppUser =token
    let savedData =await orderModel.create(data)
    res.send({data:savedData})
}
 else if(UserId.balance >=ProductId.price){
    await userModel.findOneAndUpdate({_id:userId},
        {$set:{balance:UserId.balance-ProductId.price}})
        data['amount']=ProductId.price
        data['isFreeAppUser']=req.headers.isfreeappuser
        let savedData =await orderModel.create(data)
        res.send({msg:savedData})
 }else{
    res.send("not sufficient Balance")
 }
}

module.exports.createOrder=createOrder