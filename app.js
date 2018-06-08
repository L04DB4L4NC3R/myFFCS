//https://stackoverflow.com/questions/16827987/expressjs-throw-er-unhandled-error-event
const express = require("express");
const path = require("path")
//for Oauth-2.0 login
const passport = require("passport");

require("dotenv").config()
require('./db/passport_setup.js');

const morgan = require("morgan");

//session handler
var session = require("express-session");

//handler for post requests
const bodyparser = require('body-parser');

//for main routing functions
const main_router = require("./routes/route");

//slot saving router function
const saveslot_router = require("./routes/slot_saving");

//no-sign-up router
const nosignup = require("./routes/nosignup");

//google+ Oauth-2.0 router
const auth_router = require("./routes/auth_routes");

//load database and save JSON data of courses in it
require("./db/load_in_db");

//set up a server
var app = express();
//for using urlencodedParser in post requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(morgan('dev'));


//set up a view engine
app.set("view engine","ejs");

//set up middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

//set up a session (It uses cookies)
app.use(session({secret:process.env.COOKIE_SECRET_KEY,
                        saveUninitialized:false,
                        resave:false
                    }));

//use passport js
app.use(passport.initialize());
app.use(passport.session());

//call the main router
app.use(main_router);

//call slot router function
app.use("/timetable",saveslot_router);

//call no-sign-up router
app.use("/nosignup",nosignup);

//call Oauth-2.0 router for Google+ login
app.use("/auth",auth_router);

//listen on specified port

app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on localhost: " + process.env.PORT);
});
