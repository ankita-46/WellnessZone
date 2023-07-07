const  express = require('express');
require("./db/conn");
const path = require("path");
const socketio = require('socket.io')
const Filter = require('bad-words')
const http = require('http')
const hbs = require("hbs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { generateMessage, generateLocationMessage,addMessage,getAllMessages } = require('./controller/messageController')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./controller/userChatController')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3001;
const static_path = path.join(__dirname, "/public");
const template_path = path.join(__dirname, "/views");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
server.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});

const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.render('homepage');
})


//mini app
const userRouter = require('./Routers/userRouter');
const articleRouter = require('./Routers/articleRouter');
const adminRouter = require('./Routers/adminRouter');
const chatRouter = require('./Routers/chatRouter');
app.use('/user',userRouter);
app.use('/article',articleRouter);
app.use('/admin',adminRouter);
app.use('/chat',chatRouter);


//socket handeling

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', async (options, callback) => {
        const { error, user } = await addUser({ id: socket.id, ...options })
        // console.log(user)
        if (error) {
            return callback(error)
        }
        // console.log(socket.request.headers)
        socket.join(user.room)
        let messages = await getAllMessages(user.room);
        messages.sort((a, b) => a.createdAt - b.createdAt);
        // console.log(messages)
        socket.emit('history',messages);
        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.name} has joined!`))
        let users = await getUsersInRoom(user.room);
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: users
        })

        callback()
    })

    socket.on('sendMessage', async (message, callback) => {
        const user = await getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        const msg = await addMessage(user.room,generateMessage(user.name, message));
        // console.log(msg)
        io.to(user.room).emit('message', generateMessage(user.name, message))
        callback()
    })

    socket.on('sendLocation', async (coords, callback) => {
        const user = await getUser(socket.id)
        const msg = await addMessage(user.room,generateLocationMessage(user.name, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        // console.log(msg)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.name, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', async () => {
        const user = await removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.name} has left!`))
            let users = await getUsersInRoom(user.room);
            // console.log(users);
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: users
            })
        }
    })
})

