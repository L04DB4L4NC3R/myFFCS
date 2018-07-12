const mongoose = require('mongoose');
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once("open",()=>{
    console.log("connected to database");
}).on("error",(error)=>{
    console.log("error");
});
