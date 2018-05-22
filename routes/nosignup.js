const model = require("../db/model").courseModel;
const router = require("express").Router();


router.get("/timetable",(req,res)=>{
    res.render("nosignup-timetable");
});


module.exports = router;
