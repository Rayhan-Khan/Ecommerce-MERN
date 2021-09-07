const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
      },
    email:{
        type:String,
        required:true,
        trim:true,
      
        lowercase:true
    },
    hash_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNumber:{type:String},
    profilePicturer:{type:String},
},{timestamps:true})

/* userSchema.virtual("password")
.set(function(password){
    this.hash_password=bcrypt.hashSync(password,11);
}); */

userSchema.virtual('fullname')
.get(function(){
    return this.firstName + " "+this.lastName;
});
userSchema.methods={
    authenticate:async function(password){
        return await bcrypt.compare(password,this.hash_password);
    }
}


module.exports=mongoose.model('User',userSchema);