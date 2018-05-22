const profileModel = require("../db/model").profileModel;
const model = require("../db/model").courseModel;
const router = require("express").Router();
var checkClash = require("../db/helpers").checkClash;
var verifyRoute = require("../db/helpers").verifyRoute;




router.get("/logout",verifyRoute,(req,res)=>{
    req.session.email='';
    if(req.user) req.logout();
    res.redirect('/');
});



/* makes an array of clicked course slots and matches them against all alots in the database,
if match found then slot clashed */
//There is a better method to do this

router.post("/save",verifyRoute,async (req,res)=>{
    console.log(req.session.email+" Logged in");

    // make an array of slots of the courses being registered
    let slots = req.body.SLOT.split("+"),str = '',cr = 0;

    //string waits for the promise to be completed and then gets assigned the value of all the slots
    let variable = await profileModel.findOne( {email:req.session.email} ).then( (data)=>{

        data.courses.forEach( (element)=>{
            //make a string by concatenating all slots in courses
            str += (element.SLOT + '+');
            cr += parseInt(element.CREDITS);
        });
        return {slots:str,credits:cr};

    }).catch( (err)=>{
        console.log(err);
    });

    console.log("total credits = "+(parseInt(req.body.CREDITS)+variable.credits) );

    //TODO check if applying for same course again, TODO theory and lab clashes

    // if requested for a course which makes more than 27 total credits then throw alert
    if(variable.credits + parseInt(req.body.CREDITS) > 27)
        res.send( {status:"limit",info:27-variable.credits} );

    //checkClash returns a clashed slot if slots are clashed
    else if( checkClash(slots,variable.slots) )
        res.send( {status:"clashed",info:slot} );

    //if no clash then update the database
    else profileModel.update( {email:req.session.email}, {$push: {courses:req.body} } ).then( ()=>{

        console.log("updated");
        res.send( { status:"updated",info:variable.credits + parseInt(req.body.CREDITS),course:req.body } );
    });


});



//deletes an element after clicking on a specific button
router.delete('/del',verifyRoute,(req,res)=>{


    profileModel.update( {email:req.session.email},{$pull: {courses:req.body} }  ).then( ()=>{

        console.log("removed course!");

        //TODO res.redirect('/timetable') but it doesnt work
        res.send("Deleted course")//res.redirect("/timetable");

    }).catch( (err)=>{
        console.log(err);
    });


});




//predictive text, receives AJAX requests after typing every character in input box
router.post('/predict',verifyRoute,(req,res)=>{


    var array=[],unique=[];

    //matches regex for text
    model.find( {CODE:  {$regex: req.body.code } } ).then((data)=>{

        if(data===undefined) res.send('');

        //to send only titles and course codes to the front end
        for(element of data){
            var obj = {code:element.CODE,title:element.TITLE} ;

            //TODO need to remove duplicate results, but not working
            if(array.indexOf(obj)===-1)
                array.push(obj);

            //to send just 5 results
            if(array.length === 5)
                break;
        };
        //console.log(array);
        res.send(array);
    });
});



module.exports = router;
