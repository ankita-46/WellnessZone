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

//temporary
const jwt = require('jsonwebtoken');
const jwt_key = require('./secrets');
const userModel = require('./models/userModel');

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});

const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use(express.json());

app.get("/",async (req,res)=>{
    try{
        let token=req.cookies.isloggedin;
        if(token)
        {
            let payload=jwt.verify(token,jwt_key);
            if(payload)
            {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                req.user=user;
                res.render('postlogin');
            }
            else{
                res.render('homepage',{
                    message:"user not verified"
                })
            }
        }
        else{
            res.render('homepage',{
                message:"please login again"
            })
        }
    }
    catch(err)
    {
        res.render('homepage',{
            message:err.message
        })
    }
})

//mini app
const userRouter = require('./Routers/userRouter');
const articleRouter = require('./Routers/articleRouter');
const adminRouter = require('./Routers/adminRouter');
app.use('/user',userRouter);
app.use('/article',articleRouter);
app.use('/admin',adminRouter);
