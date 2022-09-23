
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


const createUser = async function (req, res) {
    try {
        const data = req.body;
        const { title, name, phone, email, password, address } = data;

        const objKey = Object.keys(data).length;

        if (objKey == 0)
            return res.status(400).send({ status: false, msg: "Please fill data" });


        // title 
        if (!title == title || name == "")
            return res.status(400).send({ status: false, msg: "title is required" });


        // name
        if (!name == name || name == "") return res.status(400).send({ status: false, message: "Name is required" });
        if (!checkName.test(name)) return res.status(400).send({ status: false, message: "please use correct name" })
        //phoneNum
        if (!phone == phone || phone == "") return res.status(400).send({ status: false, message: "phone-number is required" });
        if (!phoneNum.test(phone)) return res.status(400).send({ status: false, message: "please use correct phone" })

        //email
        if (!email == email || email == "") return res.status(400).send({ status: false, message: "email is required" });
        if (!emailMatch.test(email)) return res.status(400).send({ status: false, message: "please use correct email" })
        //password
        if (!password == password || password == "") return res.status(400).send({ status: false, message: "password is required" });
        if (!passwordCheck.test(password)) return res.status(400).send({ status: false, message: "please use correct password" })


        address;
        if (!address.street == address.street) return res.status(400).send({ status: false, message: "address is required" });
        if (!checkName.test(data.address.city)) return res.status(400).send({ status: false, message: "enter city name in valid format" });
        if (!/^\d{6}$/.test(data.address.pincode))
            return res.status(400).send({ status: false, message: "only six number is accepted in pincode " });



        const CreatedData = await userModel.create(data);
        return res.status(201).send({ status: true, message: "success", data: CreatedData });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });

    }
};



const login = async function (req, res) {
    try {
        let Userdetail = req.body
        if (Object.keys(Userdetail).length != 0) {
            let User = await UserModel.findOne({ email: Userdetail.email, password: Userdetail.password });
            if (User) {
                let token = jwt.sign(
                    {
                        UserId: User._id.toString(),
                        batch: "plutonium",
                        organisation: "FunctionUp",
                    },
                    "Project-3-cr-groupe-52"
                );
                res.setHeader(token);
                res.status(201).send({ status: true, token: token });
            } else {
                return res.status(403).send({
                    status: false,
                    msg: "Email or password is not corerct",
                });
            }
        } else {
            res.status(400).send({ msg: "BAD REQUEST" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

module.exports = {createUser,login}
