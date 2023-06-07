const mongoose = require('mongoose');

const aarticleSchema = mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true,
    },
    articleImage:{
        type:String,
        default:'img/article/default.jpeg'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'article must belonged to a user']
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const adminarticlesModel = mongoose.model('adminarticlesModel',aarticleSchema);

module.exports = adminarticlesModel;