const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    room:{
        type:String,
        required:true
    },
    messages:[
        {
            username:{
                type:String,
                required:true
            },
            text:{
                type: String,
                default:""
            },
            url:{
                type: String,
                default:""
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
});
const roomModel = mongoose.model('roommodel',roomSchema);

module.exports = roomModel;