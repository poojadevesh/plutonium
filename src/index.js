const express = require('express')
const mongoose=require('mongoose')
const route = require('./routes/route.js')
const app=express();

app.use(express.json())

mongoose.connect("mongodb+srv://FARINEKHAN:EXtlAhONzagSoJCy@cluster0.wge8afd.mongodb.net/g19?")
.then(()=>console.log("mongoDb is connected"))
.catch(err=>console.log(err))

app.use('/',route)
//connecting port//
app.listen(3000,function(){
    console.log("express at running on port" + (3000))
})