const mongoose = require('mongoose');
<<<<<<< HEAD
const userSchema =new mongoose.Schema({
    title:{
=======

const userSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        trim: true,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss']
      },
  
      name: {
        type: String,
        required: true,
        trim: true
      },
  
      phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
  
      email: {
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
        type: String,
        required: true,
        unique: true,
        trim: true,
<<<<<<< HEAD
        Enum:['Mr', 'Mrs', 'Miss']
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        validemail: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 15,
    },
    address:{
        street:{type: String},
        city:{type: String},
        pincode:{type: String},
    }

},{timestamps:true});


module.exports = mongoose.model("User52",userSchema)
=======
        lowercase:true,
      },
  
      password: {
        type: String,
        required: true,
        trim: true,
        minlength:8,
        maxlength:15,
      },
      address: {
        street: { type: String },
        city: { type: String },
        pincode: { type: String },
      }
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("User52", userSchema)
>>>>>>> e66d4c70b2612921ea354dff334d2c8094ce0346
