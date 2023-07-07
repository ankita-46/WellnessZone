const  express = require('express');
const userModel = require('../models/userModel');
const userarticlesModel = require('../models/userarticlesModel');
const jwt = require('jsonwebtoken');
const jwt_key = require('../secrets');
const { sendmail } = require('./helper');

//signup function
module.exports.signup=async function signup(req, res) {
    try{
        let dataobj = req.body;
        let email = dataobj.email;
        let password = dataobj.password;
        let confirmpassword = dataobj.confirmpassword;
        if(password===confirmpassword)
        {
            let checkuser = await userModel.findOne({email:email});
            if(checkuser)
            {
                return res.render("signup",{
                    message:"this email already exists login please"
                })
            }
            let user = await userModel.create(dataobj);
            if(user)
            {
                res.redirect("/user/login");
            }
            else{
                res.render("signup",{
                    message:"error while signing in"
                })
            }
        }
        else
        {
            res.render("signup",{
                message: "password and confirm password are not matching"
            })
        }
    }
    catch(err)
    {
        res.render("signup",{
            message:err.message
        })
    }
}

//user login
module.exports.login= async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //user bcrypt compare function
                if (user.password === data.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({payload:uid},jwt_key);
                    res.cookie('isloggedin',token,{httpOnly:true});
                    res.redirect("/user/home");
                }
                else {
                    res.render('login',{
                        message: "wrong credentials"
                    });
                }
            }
            else {
                res.render('login',{
                    message: "user not found"
                })
            }
        }
        else{
            res.render('login',{
                message:"no email entered"
            });
        }
    }
    catch (err) {
        res.statue(500).render('login',{
            message: err.message
        });
    }
}

//authorised function -> to check the user's role
module.exports.isAuthorised= function isAuthorised(roles)
{
    return function(req,res,next)
    {
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:"operation not allowed"
            })
        }
    }
}

//protect route
module.exports.protectRoute= async function protectRoute(req,res,next)
{
    try{
        let token;
        if(req.cookies.isloggedin)
        {
            token = req.cookies.isloggedin;
            let payload=jwt.verify(token,jwt_key);
            if(payload)
            {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                req.user=user;
                next();
            }
            else{
                res.json({
                    message:"user not verified"
                })
            }
        }
        else{
            res.json({
                message:"please login again"
            })
        }
    }
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}

//forget password
module.exports.forgetpassword = async function forgetpassword(req,res)
{
    try{
        let {email} = req.body;
        const user = await userModel.findOne({email:email});
        if(user)
        {
            const resetToken = user.createResetToken();
            //we want link of this type->
            //http://abc.com/resepassword/resetToken
            let resetpasswordlink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send mail to user using nodemailer
            sendmail(email,"reset password",'Reset Password Link',resetpasswordlink);
        }
        else{
            res.json({
                message:"please signup"
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
}

//resetpassword function
module.exports.resetpassword =  async function resetpassword(req,res)
{
    try{
        const token = req.params.token;
        let {password,confirmpassword} = req.body;
        const user = await userModel.findOne({resetToken:token});
        if(user)
        {
            user.resetPasswordHandler(password,confirmpassword);
            await user.save();
            res.json({
                message:"user password changed succesfully please login again"
            })
        }
        else{
            res.json({
                message:"user not found"
            })
        }
    }
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}

module.exports.logout = function logout(req,res)
{
    res.cookie('isloggedin','',{maxAge:1});
    res.redirect('/');
}

module.exports.home = async (req, res)=>{
    let articles = await userarticlesModel.find();
    let name = req.user.name;
    // console.log(name);
    if(req.user.role==='admin')
    res.render('postlogin', {isAdmin: 'true', articles,name:name,room:'groupchat'});
    else
    res.render('postlogin', {isAdmin: 'false', articles,name:name,room:'groupchat'});
}