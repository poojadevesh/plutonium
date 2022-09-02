
const { access } = require('fs')
const jwt =require('jsonwebtoken')

const authenticate = function(req, res, next) {
    try{let token =req.headers["x-auth-token"]
    // if(!token) token =req.headers["x-auth-token"]
    if(!token) return res.status(400).send({status:false,msg:"token must be present"})
    console.log(token)

    let decodedToken =jwt.verify(token,"functionup plutonium")
    if(!decodedToken){
        return res.status(401).send({status:false,msg:"token is invalid"})
    }
    req.loggedInUser=decodedToken.userId
    next()
}catch (error) {
          res.status(500).send({ msg: error.message })
        }
    
}


const authorise =function (req,res,next){
    try{let requestedUsrId =req.params.userId
        if(requestedUsrId !== req.loggedInUser){
            return res.send({status:false,msg:"permission denied"})
        }
        next()}

    catch (error) {
          res.status(500).send({ msg: error.message })
        }
 }






// const authenticate = function (req, res, next) {
//     try {
//       const token = req.headers["x-auth-token"];
//       if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
//       const decodedToken = jwt.verify(token, "functionupplutonium");
  
//       if (!decodedToken) return res.status(401).send({ status: false, msg: "token is invalid" });
  
//       next()
//     }
//     catch (error) {
//       res.status(500).send({ msg: error.message })
//     }
//   }
  
module.exports.authenticate=authenticate
module.exports.authorise=authorise







































































































// const mid1= function ( req, res, next) {
    //     req.falana= "hi there. i am adding something new to the req object"
    //     console.log("Hi I am a middleware named Mid1")
    //     next()
    // }
    
    // const mid2= function ( req, res, next) {
    //     console.log("Hi I am a middleware named Mid2")
    //     next()
    // }
    
    // const mid3= function ( req, res, next) {
    //     console.log("Hi I am a middleware named Mid3")
    //     next()
    // }
    
    // const mid4= function ( req, res, next) {
    //     console.log("Hi I am a middleware named Mid4")
    //     next()
    // }
    
    // module.exports.mid1= mid1
    // module.exports.mid2= mid2
    // module.exports.mid3= mid3
    // module.exports.mid4= mid4
    