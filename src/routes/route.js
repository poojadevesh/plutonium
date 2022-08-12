const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

router.get('/students/:name/:gender',function(req,res){
    let studentName= req.params.name
    console.log(studentName)
    res.send(studentName)
})

// router.get('/get-query1',function(req,res){
//     let marks =req.query.marks
//     let result=marks>40?"pass":"fail"
//     res.send({data:result,status:true})
// })



router.post('/post-query1',function(req,res){
    let marks =req.query.marks
    let result=marks>40?"pass":"fail"
    res.send({data:result,status:true})
})
let arr =[22,3344,223,55,66,766,87,65,21,575665]
router.post('/post-query2', function(req,res){
    let input = req.query.input
    let finalarr=arr.filter(ele=>ele>input)
    res.send({data:finalarr,status:true})
})

let persons=[{
    name:"pk",
    age:10,
    votingStatus:false
},
{
    name:"sk",
    age:20,
    votingStatus:false
},
{
    name:"AA",
    age:70,
    votingStatus:false
},
{
    name:"SC",
    age:5,
    votingStatus:false
},{
    name:"HO",
    age:40,
    votingStatus:false
}]

router.post('/persons',function(req,res){

  let votingAge = req.query.votingAge
  let result =[]
  for(let i=0;i<persons.length;i++){
    let id =persons[i]
    if(id.age>votingAge){
        id.votingStatus=true
        result.push(id)
    }
  }
      return res.send({data:result,status:true})
})


    let players=  [
    {
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },
]


router.post('/players', function (req, res) {
    let newname=req.body.name
    num =0
    for(let i =0; i <players.length;i++){
        let data=players[i]
        if(data.name===newname){
            let num=1
            res.send('try another name')
        }
        if(num==0){
            players.push(req.body)

    }
}
    res.send(players)
});

 
module.exports = router;


