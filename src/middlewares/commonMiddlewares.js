
const validation =function (req,res,next){
    let tokenHeader =req.headers.isfreeappuser
    console.log(tokenHeader)
    if(!tokenHeader){
        res.send("please enter the value")
    }else{
        next()
    }

}
module.exports.validation= validation