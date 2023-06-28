const validator = require("email-validator");
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return validator.validate(this.email)
        }
    },
    password:{
        type:String,
        required:true,
        // minlength:8
    },
    confirmpassword:{
        type:String,
        required:true,
        validate:function(){
            return this.confirmpassword==this.password;
        },
        // minlength:8
    },
    role:{
        type:String,
        enum:['admin','user','counsellor'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
});

userSchema.pre('save',function(){
    this.confirmpassword=undefined;
})

userSchema.methods.createResetToken = function()
{
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password,confirmpassword)
{
    this.password = password;
    this.confirmpassword = confirmpassword;
    this.resetToken = undefined;
}

// implement it later
// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedstring = await bcrypt.hash(this.password,salt);
//     // console.log(hashedstring);
//     //set password to hashed string
//     this.password = hashedstring;
// })

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;