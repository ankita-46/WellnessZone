const  express = require('express');
const adminRouter = express.Router();
const {getAllUser,deleteUser,getUserByAdmin}=require('../controller/userController');
const {protectRoute,isAuthorised}=require('../controller/authController');
const {getAllArticles,getArticle,deleteArticle} = require('../controller/articleController');
const {getArticles,getSingleArticles,uploadArticle,delArticle,searchReviewArticle} = require('../controller/adminController');


//admin specific function
adminRouter.use(protectRoute);
adminRouter.use(isAuthorised(['admin']));
adminRouter
.route('/getAllUser')
.get(getAllUser)

adminRouter
.route('/getSingleArticles')
.post(getSingleArticles)

adminRouter
.route('/searchreview')
.post(searchReviewArticle)

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

adminRouter
.route('/deletearticles/:id')
.post(delArticle)

adminRouter
.route('/articles')
.get(getAllArticles)

adminRouter
.route('/articles/:id')
.get(getArticle)
.delete(deleteArticle)


module.exports = adminRouter;