const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const userModel = require('../models/userModel')
const register = async function(req, res, next) {
    let {username,email,password,favsport,phone,address,role} = req.body;
    if(!username || !password || !email || !phone || !address || !favsport || !role) return res.json({success:false,message:"Please Provide Complete Info"});
    const prevUser = await userModel.findOne({email:email});
    if(prevUser) return res.json({success:false,message:'User Already Registered'});
    try {
      const newrole = role === 'admin' ? 1 : 0;
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
              const user = await userModel.create({
                username,
                email,
                password:hash,
                phone,
                favsport,
                address,
                role:newrole
              });
              const token =await generateToken(user);
              res.cookie('token',token).json({success:true,message:'User Registered Successfully',user,token});
            })
          })
    } catch (error) {
        console.log(error.message);
    }
  };
  module.exports = register;