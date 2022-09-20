import user from  '../models/userModel.js'

import {isValid } from '../util/validator.js'

const createUser = async (req,res)=>{}
























//========================POST /login===============================
const userLogin=async (req,res)=>{
const { email, password } = req.body;

if (Object.keys(req.body).length == 0) {
    return res
        .status(400)
        .send({ status: false, message: "Enter Login Credentials." })
}

if (!isValid(email)) {
    return res.status(400).send({ status: false, msg: "Email Required." })
}
if (!isValid(password)) {
    return res.status(400).send({ status: false, msg: "Password Required." })
}

const validateEmail = function (mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
}

if (!validateEmail(email)) {
    return res
        .status(400)
        .send({ status: false, message: "Incorrect Email !!!" })
}

const validatePassword = function (password) {
    if (/^[A-Za-z\W0-9]{8,15}$/.test(password)) {
        return true;
    }
}

if (!validatePassword(password)) {
    return res
        .status(400)
        .send({ status: false, message: "Incorrect Password !!!" })
}

let user = await userModel
    .findOne({ email: email, password: password })
    .select({ _id: 1 })

if (!user) {
    return res.status(401).send({
        status: false,
        message: "Authentication failed!!!, Incorrect Email or Password !!!",
    })
}

let token = jwt.sign(
    {
        userId: user._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor((Date.now() / 1000) + 180 * 60),
    },
    "Room 36"
)
return res
    .status(200)
    .send({ status: true, message: "Login Successfully", token: token });
};






export { userLogin, }

