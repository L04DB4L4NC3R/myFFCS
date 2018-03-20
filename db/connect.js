const mongoose = require('mongoose');
const secret = require("../secret");

mongoose.connect(secret.mongoURL);

mongoose.connection.once("open",()=>{
    console.log("connected to database");
}).on("error",(error)=>{
    console.log("error");
});
