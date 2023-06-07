const userarticlesModel = require('../models/userarticlesModel');
const adminarticlesModel = require('../models/adminarticlesModel');

module.exports.getAllArticles = async function getAllArticles(req,res)
{
    try{
        let articles = await userarticlesModel.find();
        if(articles.length)
        {
            res.json({
                message:"data retrieved",
                articles:articles
            })
        }
        else 
        {
            res.json({
                message:"articles not found"
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

module.exports.getArticle = async function getArticle(req,res)
{
    try{
        let id = req.params.id;
        let article = await userarticlesModel.findById(id);
        if(article)
        {
            res.json({
                message:"data retrieved",
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

module.exports.createArticle = async function createArticle(req,res)
{
    try{
        let data = req.body;
        let userid = req.id;
        let articleobj = {
            heading:data.heading,
            discription:data.discription,
            user:userid
        }
        let article = await adminarticlesModel.create(articleobj);
        if(article)
        {
            res.json({
                message:"atricle gone for review",
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

module.exports.updateArticle = async function updateArticle(req,res)
{
    try{
        let id = req.params.id;
        let datatobeupdated = req.body;
        let article = await userarticlesModel.findByIdAndUpdate({_id:id},datatobeupdated,{new:true});
        if(article)
        {
            res.json({
                message:"data updated",
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

module.exports.deleteArticle = async function deleteArticle(req,res)
{
    try{
        let id = req.params.id;
        let article = await userarticlesModel.findByIdAndDelete({_id:id});
        if(article)
        {
            res.json({
                message:"data delted",
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