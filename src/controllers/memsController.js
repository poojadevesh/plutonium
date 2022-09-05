let axios = require("axios")

let memsCreate =  async function (req,res){
    try{
        let options ={
            method:"post",
            url:"https://api.imgflip.com/get_memes?template_id=124822590&text0=functionUp&text1=other Bootcamps&username=chewie12345&password=meme@123"
        }
     let result= await axios(options)
     res.send({data:result.data})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
  module.exports.memsCreate=memsCreate