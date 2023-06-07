const  express = require('express');
const adminRouter = express.Router();
const {getAllUser,deleteUser,getUserByAdmin}=require('../controller/userController');
const {protectRoute,isAuthorised}=require('../controller/authController');
const {getAllArticles,getArticle,deleteArticle} = require('../controller/articleController');
const {getArticles,uploadArticle,delArticle} = require('../controller/adminController');


//admin specific function
adminRouter.use(protectRoute);
adminRouter.use(isAuthorised(['admin']));
adminRouter
.route('/getAllUser')
.get(getAllUser)

adminRouter
.route('/getuser/:id')
.get(getUserByAdmin)
.delete(deleteUser)

adminRouter
.route('/reviewarticles')
.get(getArticles)

adminRouter
.route('/reviewarticles/:id')
.post(uploadArticle)
.delete(delArticle)

adminRouter
.route('/articles')
.get(getAllArticles)

adminRouter
.route('/articles/:id')
.get(getArticle)
.delete(deleteArticle)


module.exports = adminRouter;