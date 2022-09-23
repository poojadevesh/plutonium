// const userModel = require("../models/userModel");
// const jwt = require("jsonwebtoken");


// const createUser = async function (req, res) {
//     try {
//         const data = req.body;
//         const { title, name, phone, email, password, address } = data;

//         const objKey = Object.keys(data).length;

//         if (objKey == 0)
//             return res.status(400).send({ status: false, msg: "Please fill data" });


//         // title 
//         if (!title == title || name == "")
//             return res.status(400).send({ status: false, msg: "title is required" });


//         // name
//         if (!name == name || name == "") return res.status(400).send({ status: false, message: "Name is required" });
//         if (!checkName.test(name)) return res.status(400).send({ status: false, message: "please use correct name" })
//         //phoneNum
//         if (!phone == phone || phone == "") return res.status(400).send({ status: false, message: "phone-number is required" });
//         if (!phoneNum.test(phone)) return res.status(400).send({ status: false, message: "please use correct phone" })

//         //email
//         if (!email == email || email == "") return res.status(400).send({ status: false, message: "email is required" });
//         if (!emailMatch.test(email)) return res.status(400).send({ status: false, message: "please use correct email" })
//         //password
//         if (!password == password || password == "") return res.status(400).send({ status: false, message: "password is required" });
//         if (!passwordCheck.test(password)) return res.status(400).send({ status: false, message: "please use correct password" })


//         address;
//         if (!address.street == address.street) return res.status(400).send({ status: false, message: "address is required" });
//         if (!checkName.test(data.address.city)) return res.status(400).send({ status: false, message: "enter city name in valid format" });
//         if (!/^\d{6}$/.test(data.address.pincode))
//             return res.status(400).send({ status: false, message: "only six number is accepted in pincode " });



//         const CreatedData = await userModel.create(data);
//         return res.status(201).send({ status: true, message: "success", data: CreatedData });
//     } catch (err) {
//         return res.status(500).send({ status: false, msg: err.message });

//     }
// };



// const login = async function (req, res) {
//     try {
//         let Userdetail = req.body
//         if (Object.keys(Userdetail).length != 0) {
//             let User = await UserModel.findOne({ email: Userdetail.email, password: Userdetail.password });
//             if (User) {
//                 let token = jwt.sign(
//                     {
//                         UserId: User._id.toString(),
//                         batch: "plutonium",
//                         organisation: "FunctionUp",
//                     },
//                     "Project-3-cr-groupe-52"
//                 );
//                 res.setHeader(token);
//                 res.status(201).send({ status: true, token: token });
//             } else {
//                 return res.status(403).send({
//                     status: false,
//                     msg: "Email or password is not corerct",
//                 });
//             }
//         } else {
//             res.status(400).send({ msg: "BAD REQUEST" })
//         }
//     } catch (error) {
//         res.status(500).send({ msg: "Error", error: error.message })
//     }
// }

// module.exports = {createUser,login}



const userModel = require("../models/userModel")
// const validator = require("../validator/validate")
const jwt = require("jsonwebtoken");



const createUser = async function (req, res) {
    try {
        let data = req.body

        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "data in request body is required" });

        //title
        if (!data.title) return res.status(400).send({ status: false, message: "title is required" });
        if (!validator.isValidTitle(data.title)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters in the title, It should be Mr, Mrs, Miss" })
        }

        //name
        if (!data.name) return res.status(400).send({ status: false, message: "Name is required" });
        if (!validator.regexSpaceChar(data.name)) return res.status(400).send({ status: false, message: " enter Name is in valid format" });
        const checkName = await userModel.findOne({ name: data.name })
        if (checkName) return res.status(400).send({ status: false, message: `author ${data.name} already exists` })


        //phoneNum
        if (!data.phone) return res.status(400).send({ status: false, message: "phone-number is required" });
        if (!validator.moblieRegex(data.phone)) return res.status(400).send({ status: false, message: "please provide the mobile number in a valid format..." })
        const checkPhone = await userModel.findOne({ phone: data.phone })
        if (checkPhone) return res.status(400).send({ status: false, message: "This phone no. already exists" })



        //email
        if (!data.email) return res.status(400).send({ status: false, message: "email is required" });
        if (!validator.isValidEmail(data.email)) return res.status(400).send({ status: false, message: `this mail is not valid ::${data.email}` }) //template literal
        const find = await userModel.findOne({ email: data.email })
        if (find) return res.status(400).send({ status: false, message: "This email already exists" })

        //password
        if (!data.password) return res.status(400).send({ status: false, message: "password is required" });
        if (!validator.isValidPassword(data.password)) return res.status(400).send({ status: false, message: `Password should be 8 to 15 characters which contain at least one numeric digit, one uppercase and one lowercase letter` })

        //address
        if (!data.address.street) return res.status(400).send({ status: false, message: "address is required" });
        if (!validator.isREgexName(data.address.city)) return res.status(400).send({ status: false, message: "enter city name in valid format" });
        if (!/^\d{6}$/.test(data.address.pincode))
            return res.status(400).send({ status: false, message: "only six number is accepted in pincode " });


        const CreatedData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "success", data: CreatedData })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const login = async function (req, res) {
    try {
        let userName = req.body.email;
        let password = req.body.password;

        let data = req.body
        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "data in request body is required" });
        if (!validator.valid(userName)) return res.status(400).send({ status: false, message: "email is required...!" })
        if (!validator.valid(password)) return res.status(400).send({ status: false, message: "password is required.!" })

        let user = await userModel.findOne({ email: userName, password: password });
        if (!user) return res.status(400).send({ status: false, msg: "username or the password is not correct", });


        //after successfully creation of login jwt token will be created

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                batch: "Radon",
                organisation: "FunctionUp",
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
            },
            "Book-Management"
        );
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, message: "Login successful", token: token });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }

}



module.exports = {createUser ,login}