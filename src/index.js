const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://project3:dataBase52@cluster0.iu3wti0.mongodb.net/GROUP52DATA-BASE", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});