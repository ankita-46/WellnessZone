const  express = require('express');
const chatRouter = express.Router();
const {protectRoute}=require('../controller/authController');
const {getchatpage} = require('../controller/chatController')

chatRouter.use(protectRoute);
chatRouter
.route('/room')
.get(getchatpage);

module.exports = chatRouter