const mongoose = require('mongoose');

const userarticleSchema = mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        require: true,
    },
    articleImage:{
        type:String,
        require: false,
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

const userarticlesModel = mongoose.model('userarticlesModel',userarticleSchema);

module.exports = userarticlesModel;