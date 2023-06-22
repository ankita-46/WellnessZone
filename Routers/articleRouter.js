const  express = require('express');
const { protectRoute } = require('../controller/authController');
const {getAllArticles,getArticle,createArticle,updateArticle,deleteArticle} = require('../controller/articleController');
const articleRouter = express.Router();

articleRouter
.route('/all')
.get(getAllArticles)

articleRouter
.route('/:id')
.get(getArticle)

articleRouter.use(protectRoute)
articleRouter
.route('/createArticle')
.post(createArticle)

articleRouter
.route('/:id')
.patch(updateArticle)
.delete(deleteArticle)

module.exports=articleRouter;