const userarticlesModel = require('../models/userarticlesModel');
const adminarticlesModel = require('../models/adminarticlesModel');
const userModel = require('../models/userModel');

module.exports.getArticles = async function getArticles(req,res)
{
    try{
        let articles = await adminarticlesModel.find();
        let isAdmin;
        if(req.user.role==='admin')
        isAdmin='true';
        else
        isAdmin='false';
        res.render('reviewArticles', {isAdmin, articles});
    }
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}

module.exports.getSingleArticles = async function getArticles(req,res)
{
    try{
        let adminArticle = await adminarticlesModel.findById(req.body.articleid);
        let isAdmin;
        if(req.user.role==='admin')
        isAdmin='true';
        else
        isAdmin='false';
        res.render('article', {isAdmin, adminArticle});
    }
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}


module.exports.uploadArticle = async function uploadArticle(req,res)
{
    try{
        let id = req.params.id;
        let article = await adminarticlesModel.findByIdAndDelete(id);
        if(article)
        {
            let articleobj = {
                heading: article.heading,
                discription: article.discription,
                tags: article.tags,
                articleImage: article.articleImage,
                user: article.user
            }
            let save = await userarticlesModel.create(articleobj);
            res.redirect("/admin/reviewarticles");
        }
        else 
        {
            res.json({
                message:"article not found"
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


module.exports.delArticle = async function delArticle(req,res)
{
    try{
        let id = req.params.id;
        let article = await adminarticlesModel.findByIdAndDelete(id);
        if(article)
        {
            res.redirect("/admin/reviewarticles");
        }
        else 
        {
            res.json({
                message:"article not found"
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

module.exports.searchReviewArticle = async (req, res)=>{
    var word = req.body.searchfield.toLowerCase();
    const regex = new RegExp(word, "i");
    let articles = await adminarticlesModel.find({ tags: { $regex: regex } });
    let isAdmin;
    if(req.user.role==='admin')
    isAdmin='true';
    else
    isAdmin='false';
    res.render('reviewArticles', {isAdmin, articles});
}