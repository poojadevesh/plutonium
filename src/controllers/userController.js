const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')
const jwt = require('jsonwebtoken')


const {isValidBody,isValidStr,isValidEnum,isValidNumber, isValidPwd,isValidObjectId} = require('../validation/userValidation')




//--------------createUser----------------//


const createUser = async function (req, res) {
  try {
    const data = req.body;
    const { title, name, phone, email, password, address } = data;

    const objKey = Object.keys(data).length;

    if (objKey == 0)
      return res.status(400).send({ status: false, msg: "Please fill data" });

    //title
    if (!title==title || title=="")return res.status(400).send({ status: false, message: "title is required" });

    //name
    if (!name==name || name =="")return res.status(400).send({ status: false, message: "Name is required" });
   if(!checkName.test(name)) return res.status(400).send({ status: false, message: "please use correct name" })
    //phoneNum
    if (!phone==phone || phone =="") return res.status(400).send({ status: false, message: "phone-number is required" });
    if(!phoneNum.test(phone)) return res.status(400).send({ status: false, message: "please use correct phone" })

    //email
    if (!email==email || email=="") return res.status(400).send({ status: false, message: "email is required" });
    if  (!emailMatch.test(email))return res.status(400).send({ status: false, message: "please use correct email" })
    //password
    if (!password==password || password =="")return res.status(400).send({ status: false, message: "password is required" });
   // if (!passwordCheck.test(password))return res.status(400).send({ status: false, message: "please use correct password" })


    address;
    if (!address.street==address.street)return res.status(400).send({ status: false, message: "address is required" });
    if (!checkName.test(data.address.city)) return res.status(400).send({ status: false, message: "enter city name in valid format" });
    if (!/^\d{6}$/.test(data.address.pincode))
        return res.status(400).send({ status: false, message: "only six number is accepted in pincode " });



    const CreatedData = await userModel.create(data);
    return res.status(201).send({ status: true, message: "success", data: CreatedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//------------------login Api -------------------//

const loginUser = async function(req, res) {
    try {

        let { email, password } = req.body;

        if (!email) { return res.status(400).send({ status: false, message: ' email cant be empty' }); }

        if (!password) { return res.status(400).send({ status: false, message: ' password cant be empty' }); }

        let emailpasswordcheck = await userModel.findOne({ email: email, password: password })

        if (!emailpasswordcheck) {
            return res.status(400).send({ status: false, message: ' please provide valid userId or password' });
        }

        let payload = {
             userId:emailpasswordcheck._id.toString(),
             plateform:"management" 
        }
        let token = jwt.sign(payload, "GroupNo55", { expiresIn: "2hr" })
       return res.status(201).send({status: true, message: "Sucessfull Login", data: { token: token }

        })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });

    }
}
module.exports = {createUser, loginUser}