const userchatmodel = require('../models/userChatModel')

module.exports.addUser = async function addUser ({ id, username, room }) {
    // Clean the data
    username = username?.trim().toLowerCase()
    room = room?.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user

    //we will implement it later 

    const existingUser = await userchatmodel.findOne({name:username,room:room});
    if(existingUser) {
        const deleteduser = await userchatmodel.findOneAndDelete({name:username,room:room})
    }

    // Store user
    const user = new userchatmodel({ name:username,id:id, room:room })
    const saveduser = await user.save();
    return { user:saveduser } 
}

module.exports.removeUser = async function removeUser (id){
    const deleteduser = await userchatmodel.findOneAndDelete({id:id})

    if(deleteduser) return deleteduser;
}

module.exports.getUser = async function getUser(id){
    return await userchatmodel.findOne({id:id})
}

module.exports.getUsersInRoom = async function getUsersInRoom(room) {
    room = room?.trim().toLowerCase()
    return await userchatmodel.find({room:room})
}

// const user = this.addUser({id:123,username:"kunal",room:'hi'});
// console.log(user);
