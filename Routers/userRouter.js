const  express = require('express');
const userRouter = express.Router();
const {getsignuppage,getloginpage,getUser,getAllUser,updateUser,deleteUser,getUserByAdmin, getuploadArticle, profileShow}=require('../controller/userController');
const {signup,login,protectRoute,isAuthorised,resetpassword,forgetpassword,logout, home}=require('../controller/authController');

//user options
userRouter
.route('/signup')
.get(getsignuppage)
.post(signup)

userRouter
.route('/login')
.get(getloginpage)
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)
.patch(updateUser)

userRouter
.route('/logout')
.get(logout)

userRouter
.route('/getuploadArticle')
.get(getuploadArticle)

userRouter
.route('/profileShow')
.get(profileShow)
module.exports = userRouter;

userRouter
.route('/home')
.get(home)