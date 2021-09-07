const express=require('express');

const {signup, signin} = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth');

const router=express.Router();


router
.post('/signup',validateSignupRequest,isRequestValidated,signup)
.post('/signin',validateSigninRequest,isRequestValidated,signin)

module.exports=router;