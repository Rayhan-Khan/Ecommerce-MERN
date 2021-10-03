const express=require('express');
const router=express.Router();

const {signup, signin} = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth');

router
.post('/signup',validateSignupRequest,isRequestValidated,signup)
.post('/signin',validateSigninRequest,isRequestValidated,signin)

module.exports=router;