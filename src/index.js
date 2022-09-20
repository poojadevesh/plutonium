const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')
const app = express()

app.use(express.join())

mongoose.connect('mongodb+srv://riju:riju@cluster0.s4hmv.mongodb.net/groupXDatabase', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB is connected'))
    .then(err => console.log(err.message))

app.use('/', route)

app.listen(3000, () => {
    console.log('Express app is running on port 3000')
})
