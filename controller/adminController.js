const userarticlesModel = require('../models/userarticlesModel');
const adminarticlesModel = require('../models/adminarticlesModel');

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

module.exports.uploadArticle = async function uploadArticle(req,res)
{
    try{
        let id = req.params.id;
        let article = await adminarticlesModel.findByIdAndDelete(id);
        if(article)
        {
            let savedarticle = await userarticlesModel.create(article);
            res.json({
                message:"article saved",
                article:savedarticle
            })
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
            res.json({
                message:"article deleted",
                article:article
            })
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