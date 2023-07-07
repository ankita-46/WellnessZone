const roommodel = require('../models/roomModel')
module.exports.addMessage = async function addMessage(room,message)
{
    let roomfind = await roommodel.findOne({room:room});
    if(roomfind)
    {
        roomfind.messages.push(message);
        // console.log(roomfind)
        return await roomfind.save();
    }
    else{
        let roomfind = new roommodel({
            room:room,
            messages:[message]
        })
        return await roomfind.save();
    }
}

module.exports.getAllMessages = async function getAllMessages(room)
{
    let roomfind = await roommodel.findOne({room:room});
    if(roomfind) return roomfind.messages;
    else return [];
}

module.exports.generateMessage = function generateMessage(username,text)
{
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports.generateLocationMessage = function generateLocationMessage(username,url)
{
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}