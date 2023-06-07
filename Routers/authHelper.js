// const jwt = require('jsonwebtoken');
// const jwt_key = require('../secrets');

// function protectRoute2(req,res,next)
// {
//     if(req.cookies.isloggedin)
//     {
//         let isverified=jwt.verify(req.cookies.isloggedin,jwt_key);
//         if(isverified) next();
//         else{
//             res.json({
//                 message:"user not verified"
//             })
//         }
//     }
//     else{
//         return res.json({
//             message:"operation not allowed"
//         })
//     }
// }

// module.exports=protectRoute2;