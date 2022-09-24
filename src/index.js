import express from 'express'
import mongoose from 'mongoose'
import route from './routes/route.js'

const app = express()
const PORT = 3000
const URI = 'mongodb+srv://project3:dataBase52@cluster0.iu3wti0.mongodb.net/GROUP52DATA-BASE'

app.use(express.json())

mongoose.connect(URI, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err.message))

app.use('/', route)

app.use((req, res) => res.status(400).send({ status: false, message: 'Invalid URL' }))

app.listen(PORT, () => console.log(`Express app is running on port ${PORT}`))
