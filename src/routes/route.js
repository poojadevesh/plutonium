const express = require('express');
const router = express.Router();
const{createBook, getBookData} = require('../controllers/bookController');
const {authn,authz} = require('../middlewares/auth')
 const {createUser, loginUser} = require('../controllers/userController');

//*!--------------APIs To Perform CURD Operation------------------

router.post('/books',authn,authz, createBook)

router.get('/books',authn, getBookData)

router.post('/register',createUser)

router.post('/login',loginUser)


module.exports=router