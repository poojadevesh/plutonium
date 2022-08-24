const mid1 =function(req,res,next){
    let loggedIn =true

    if(loggedIn==true){
        next()
    }
    else{
        res.send("login or register")
    }
}
const  mid2 = function(req,res,next){
    console.log("pooja yadav mid2")
    
    next()
}

module.exports.mid1 =mid1
module.exports.mid2=mid2