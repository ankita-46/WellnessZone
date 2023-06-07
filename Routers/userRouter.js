const  express = require('express');
const userRouter = express.Router();
const {getUser,getAllUser,updateUser,deleteUser,getUserByAdmin}=require('../controller/userController');
const {signup,login,protectRoute,isAuthorised,resetpassword,forgetpassword,logout}=require('../controller/authController');

//user options
userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
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

module.exports = userRouter;