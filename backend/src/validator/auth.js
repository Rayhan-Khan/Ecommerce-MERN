const { check, validationResult } = require('express-validator');

exports.validateSignupRequest=[
        check('firstName')
        .notEmpty()
        .withMessage('First name is required'),
        check('lastName')
        .notEmpty()
        .withMessage('Last name is required'),
        check('email')
        .isEmail()
        .withMessage('Valid email is required'),
        check('password')
        .isLength({min:6})
        .withMessage('Password must be at least 6 character')
]
exports.validateSigninRequest=[
    check('email')
        .isEmail()
        .withMessage('Valid email is required'),
        check('password')
        .isLength({min:6})
        .withMessage('Password must be at least 6 character')
]
exports.isRequestValidated=(req,res,next)=>{
    errors=validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0].msg})
    }
     next();
}