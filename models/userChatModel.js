const mongoose = require('mongoose');
const userChatSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    }
});
const userChatModel = mongoose.model('userchatmodel',userChatSchema);

module.exports = userChatModel;