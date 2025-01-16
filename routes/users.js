var express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const check = require('../middlewares/auth');
const check2 = require('../middlewares/auth2');
const register = require('../controllers/userRegister');
var router = express.Router();

/* GET users listing. */
router.post('/register',register);
router.post('/login',async(req,res)=>{
  let {email,password} = req.body;
  if(!email || !password) return res.json({success:false,message:"Please Provide Complete Info"});
  let user = await userModel.findOne({email:email});
  if(!user) return res.json({success:false,message:"User needs to register first"});
  bcrypt.compare(password,user.password,async(err,result)=>{
    if(!result) return res.json({success:false,message:"Email or password incorrect"});
    const token =await generateToken(user);
    res.cookie("token",token,{httpOnly:true,sameSite:"lax"});
    res.json({success:true,message:"User Logged In Successfully",user,token});
  })
});
router.get('/admindashboard',check,check2,async(req,res,next)=>{
  res.json({success:true,message:"Admin Dashboard",ok:true});
});
router.get('/dashboard',check,async(resq,res,next)=>{
  res.json({success:true,message:"Successfully Tested",ok:true});
});
router.post('/forgetpassword',async(req,res,next)=>{
  let {email,favsport,newpassword} = req.body;
  if(!email || !favsport || !newpassword) return res.json({success:false,message:"Please provide complete info!!"});
  let prevuser = await userModel.findOne({email:email});
  if(!prevuser) return res.json({success:false,message:"User Not Registered"});
  if(prevuser.favsport === favsport){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(newpassword,salt,async(err,hash) => {
        const update = await userModel.findByIdAndUpdate(prevuser._id,{password:hash});
        const user = await userModel.findOne({email});
        const token = await generateToken(update);
        res.cookie("token",token).json({success:true,message:"Password Changed Successfully!!",token,user});
      })
    })
  }
  else{
    res.json({success:false,message:"User Favsport Didn't Matched"})
  }
})
module.exports = router;