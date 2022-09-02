const { access } = require('fs')
const jwt =require('jsonwebtoken')

const authenticate = function(req, res, next) {
    let token =req.headers["x-auth-token"]
    // if(!token) token =req.headers["x-auth-token"]
    if(!token) return res.send({status:false,msg:"token must be present"})
    console.log(token)

    let decodedToken =jwt.verify(token,"functionup plutonium")
    if(!decodedToken){
        return res.send({status:false,msg:"token is invalid"})
    }
    req.loggedInUser=decodedToken.userId
    next()
}
const authorise =function (req,res,next){
    let requestedUsrId =req.params.userId
    if(requestedUsrId !== req.loggedInUser){
        return res.send({status:false,msg:"permission denied"})
    }
    next()
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
