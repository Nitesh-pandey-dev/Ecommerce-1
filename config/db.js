const mongoose = require('mongoose');
// console.log(process.env.MONGO_PASSWORD);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.cpot9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("Something went wrong in db connection",err);
})
module.exports = mongoose.connection;