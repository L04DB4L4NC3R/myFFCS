const model = require("../db/model").courseModel;
const profileModel = require("../db/model").profileModel;

//to segreagate data into morning and evening theory and lab slots
const segregateData = require("../db/helpers").segregateData;

//hash function for storing passwords
const hashAndSave = require("../db/helpers").hashAndSave;

//verification middleware
const verifyRoute = require("../db/helpers").verifyRoute;

//to check hashed password
const bcrypt = require("bcrypt");

//set up router
const router = require("express").Router();





router.get('/',(req,res)=>{
    res.render('index');
});




router.post('/',(req,res)=>{

    //if posted registration form
    if(req.body.confirm !== undefined){

        var obj =  { email:req.body.email,passwd:req.body.passwd };

        profileModel.findOne( {email:req.body.email} ).then(function(data){

            if(data === null  ){

                obj = new profileModel( { email:req.body.email,passwd:req.body.passwd,courses:[] } );

                hashAndSave(obj).then(()=>{
                    //save user email in cookies
                    req.session.email = req.body.email;
                    res.redirect('/timetable');
                }).catch(err=>console.log(err));

            }

            else{
                res.send("Someone with this email already exists");
            }

        });

    }

    //if trying to log in
    else{

        profileModel.findOne( {email:req.body.email} ).then((data)=>{

            if(data === null)
                res.send("User not found");

            else{


                //check hash against password
                bcrypt.compare(req.body.passwd,data.passwd,(err,result)=>{


                      if(result){
                          //save user email in cookies
                          req.session.email = req.body.email;
                          res.redirect('/timetable');
                      }


                      else
                        res.send("incorrect password");
                });

            }


    }).catch(err=>console.log(err));

    }


});




router.get("/timetable",verifyRoute,(req,res)=>{

    res.render("timetable");

});




router.get("/timetable/fetch",verifyRoute,(req,res)=>{
    //add timetable looking up TODO

    profileModel.findOne( {email:req.session.email} ).then( (data)=>{


        //to calculate total number of credits
        var credits = (elements)=>{

            var summ=0;

            for(element of elements){
                summ += parseInt(element.CREDITS);
            }
            return summ;
        }

        res.json({data:data.courses,credits:credits(data.courses)});
    }).catch(err=>console.log(err));

});






router.post("/timetable",verifyRoute,(req,res)=>{


    model.find({CODE:req.body.CODE}).then((data)=>{

        //let segregated_data = segregateData(data);
        res.send( JSON.stringify(data) );

    });


});




module.exports = router;
