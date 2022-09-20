import express from 'express'
import mongoose from 'mongoose'
import route from './routes/route.js'

const app = express()
const PORT = 3000

app.use(express.json())

mongoose.connect('mongodb+srv://riju:riju@cluster0.s4hmv.mongodb.net/group56Database', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err.message))

app.use('/', route)

app.listen(PORT, () => {
    console.log(`Express app is running on port ${PORT}`)
})
