const isAdmin = async(req,res,next) => {
    try {
    const user = req.user;
    if(!user) return res.json({success:false,message:"Admin Unauthorised"});
    if(user.role !== 1) return res.json({success:false,message:"Unable to get admin!!"});
    else{
    req.user = user;
    next();
    }
    } catch (error) {
        console.log(error);
    }
};
module.exports = isAdmin;