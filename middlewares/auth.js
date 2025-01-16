const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const check = async(req,res,next) => {
    console.log(req.headers.token)
    const token = await req.headers.token;
    if(!token) return res.json({success:false,message:"User Not Authenticated"});
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({email:decode.email});
    req.user = user;
    next();
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = check;