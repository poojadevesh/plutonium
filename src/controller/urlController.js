const urlModel=require("../model/urlModel")
const shortid = require('shortid');
var validUrl = require('valid-url');


// const isValid = function(value) {
//     if (typeof value == "undefined" || value == null) return false;
//     if (typeof value == "string" && value.trim().length > 0) return true;
//     return false;
// };

const isValidRequest = function(object) {
    return Object.keys(object).length > 0;
};

const shortenUrl = async(req,res)=>{
    try {
        let data=req.body
        if (!isValidRequest(data)) {
            return res.status(400).send({ status: false, message: "please provide data" });
        }
       
        const regex =
      /^([hH][tT][tT][pP]([sS])?:\/\/.)(www\.)?[-a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=_]*$)/g;
        if (typeof longUrl !== "string" && !regex.test(data.longUrl.trim()))
      return res.status(400).send({ status: false, message: "Please provide Url and should be valid" });


        let presentUrl= await urlModel.findOne({longUrl:data.longUrl}).select("longUrl shortUrl urlCode")
        if(presentUrl){
            return res.status(200).send({ status: false, data:  presentUrl});
        }
        let base="http://localhost:3000/"
        let urlCode=shortid.generate().toLowerCase()
       
        let shortUrl= base+urlCode
       data.urlCode=urlCode;
       data.shortUrl=shortUrl
        let createdUrl= await urlModel.create(data)

            return res.status(201).send({ status: false, data:  createdUrl});
        
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

module.exports={shortenUrl}