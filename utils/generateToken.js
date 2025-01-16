const jwt = require('jsonwebtoken');
const generateToken = async(user) => {
    const token =await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET_KEY);
    return token;
}
module.exports = generateToken;