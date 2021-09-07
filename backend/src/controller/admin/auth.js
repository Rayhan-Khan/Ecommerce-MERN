const User=require('../../models/user');
const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt');
const shortid=require('shortid');
exports.signup=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec(async (error,user)=>{
        if(user) return res.status(400).json({
            message:'Admin Already Exist'
        });
    
        const {
            firstName,
            lastName,
            email,
            password
        }=req.body;

        const hash_password =await bcrypt.hash(password,11);
 
        const _user=new User({
            firstName,
            lastName,
            email,
            hash_password,
            username:shortid.generate(),
            role:'admin'
        });
        _user.save((err,data)=>{
            if(err) {return res.status(400).json({
                message:err
            });}
            return res.status(201).json({message:'Admin created'})
        });
    });
}


exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({error});
        }
       
        if(user){
           
            if(user.authenticate(req.body.password) && user.role==="admin"){
               const token =jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECREAT,{expiresIn:'5h'})
                const {firstName,lastName,email,role,fullname}=user;
                res.cookie('token',token,{expiresIn:'1h'})
                return res.status(200).json({
                   token,
                   user:{
                    firstName,lastName,email,role,fullname
                   }
                })
            }else 
                return res.status(500).json({message:"email or password wrong"});  
        }else 
           return res.status(400).json({error:"something went wrong"})
    })
}

exports.signout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({'message':'Signout Successfully.....'})
}