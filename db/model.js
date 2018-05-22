const mongoose = require("mongoose");

//create a schema for courses
var schema = new mongoose.Schema({
    FACULTY:String,
    TYPE:String,
    CREDITS:String,
    SLOT:String,
    CODE:String,
    TITLE:String,
    VENUE:String
});


//create a schema for storing user credentials and courses selected
var profileschema = new mongoose.Schema({
    email:String,
    passwd:String,
    courses:[]
});


//create a model based on the schema
var model = mongoose.model('course',schema);


//create a model for the profile collection
var profilemodel = mongoose.model('profile',profileschema);


//export the models
module.exports.courseModel = model;
module.exports.profileModel = profilemodel;
