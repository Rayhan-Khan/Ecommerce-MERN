const express=require('express');
const { requireSignin } = require('../../common-middleware');
const {signup, signin, signout} = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validator/auth');

const router=express.Router();


router
.post('/admin/signup',validateSignupRequest,isRequestValidated,signup)
.post('/admin/signin',validateSigninRequest,isRequestValidated,signin)
.post('/admin/signout',signout)

module.exports=router;