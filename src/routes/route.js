const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/student-details/:name/:age',function(req, res){
    // let student =["pooja","devesh","praveen"]
// console.log("this is request"+req.path)
console.log("this is request"+JSON.stringify(req.params))
let reqParams= req.params
let studentName =reqParams.name
console.log(studentName)

let studentDetails =studentName+" "+studentName


    res.send("studentDetails")
})
module.exports = router;
// adding this comment for no reason