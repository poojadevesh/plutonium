import express from 'express'
import mongoose from 'mongoose'
import route from './src/routes/route.js'

const app = express()
const PORT = 3000
const URI = 'mongodb+srv://riju:riju@cluster0.s4hmv.mongodb.net/group56Database'
app.use(express.json())

mongoose.connect(URI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err.message))

app.use('/', route)

//app.use((req,res)=>res.status(400).send("enter the path param"))
    
app.listen(PORT, () => console.log(`Express app is running on port ${PORT}`))
