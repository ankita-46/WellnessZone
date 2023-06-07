const userModel = require('../models/userModel');

module.exports.getUser= async function getUser(req,res){
    try{
        let id = req.id;
        let user = await userModel.findById(id);
        if(user)
        {
            res.json(user);
        }
        else{
            res.json({
                message:'user not found'
            });
        }
    }
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}

module.exports.updateUser=async function updateUser(req,res){
    try{
        let id = req.id;
        let user = await userModel.findById(id);
        let datatobeupdated = req.body;
        if(user)
        {
            const keys = [];
            for(let key in datatobeupdated)
            {
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++)
            {
                user[keys[i]] = datatobeupdated[keys[i]];
            }
            const updatedData = await userModel.updateOne({_id:id},user,{new:true});
            res.json({
                message:'data recieved',
                user:updatedData
            });
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

module.exports.deleteUser=async function deleteUser(req,res){
    try{
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user)
        {
            res.json({
                message:"user not found"
            })
        }
        else{
            res.json({
                message:'data deleted',
                user:user
            });
        }
    }
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}

module.exports.getAllUser=async function getAllUser(req,res)
{
    try{
        let users = await userModel.find();
        if(users)
        {
            res.json({
                message:"users recieved",
                data : users
            });
        }
        else{
            res.json({
                message:"no user exists"
            })
        }
    }
    catch(err)
    {
        res.json({
            message:err.message
        });
    }
}

module.exports.getUserByAdmin=async function getUserByAdmin(req,res)
{
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        if(!user)
        {
            res.json({
                message:"user not found"
            })
        }
        else{
            res.json({
                message:'user found',
                user:user
            });
        }
    }
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}
