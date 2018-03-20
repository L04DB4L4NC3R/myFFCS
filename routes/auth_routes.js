const router = require('express').Router();
const passport = require("passport");



//google auth
router.get('/google',passport.authenticate('google',{

//This is the info we want to retreive
    scope:["profile"]
}));


//This path gets reached after google oauth, which returns a key as a get parameter. passport.authenticate
//again authenticates the key for information exchange
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    //callback URI

    req.session.email = req.user.email;
    res.redirect("/timetable");
});

module.exports = router;
