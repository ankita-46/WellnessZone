const  express = require('express');
const { protectRoute } = require('../controller/authController');
const {getAllArticles,getArticle,createArticle,updateArticle,deleteArticle,searchArticle} = require('../controller/articleController');
const articleRouter = express.Router();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './public/images/db');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      return cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
})

const filter = function(req, file, cb){
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else{
        cb(new Error("Not an Image! Please upload an image"));
    }
}

const upload = multer({  storage: storage,
    fileFilter: filter,
    limits: { fileSize: 1024 * 1024 * 10}  
})

articleRouter
.route('/all')
.get(getAllArticles)

articleRouter.use(protectRoute)
articleRouter
.route('/createArticle')
.post(upload.single("image"), createArticle)

articleRouter
.route('/searcharticle')
.post(searchArticle)

articleRouter
.route('/:id')
.post(getArticle)

articleRouter
.route('/:id')
.patch(updateArticle)
.delete(deleteArticle)

module.exports=articleRouter;