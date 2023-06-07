const  express = require('express');
const app = express();
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3001;
const static_path = path.join(__dirname, "/public");
const template_path = path.join(__dirname, "/views");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
  });

const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use(express.json());

//mini app
const userRouter = require('./Routers/userRouter');
const articleRouter = require('./Routers/articleRouter');
const adminRouter = require('./Routers/adminRouter');
app.use('/user',userRouter);
app.use('/article',articleRouter);
app.use('/admin',adminRouter);
