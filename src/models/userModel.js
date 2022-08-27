const mongoose =require('mongoose')
const userSchema =new mongoose.Schema({
    Name:String,
    Balance:{
        type:Number,
        default:100
    },
    Address:String,
    Age:Number,
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    isFreeAppUser:{
        type:Boolean,
        default:false
    }
} ,{ timestamps: true });

module.exports = mongoose.model('newUser', userSchema)