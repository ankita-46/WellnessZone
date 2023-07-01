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
aarticleSchema.pre(/^find/,function(next)
{
    this.populate("user");
    next();
})
const adminarticlesModel = mongoose.model('adminarticlesModel',aarticleSchema);

module.exports = adminarticlesModel;