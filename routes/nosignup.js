const model = require("../db/model").courseModel;
const router = require("express").Router();


router.get("/",(req,res)=>{
    res.render("timetable2");
});






router.post("/timetable",(req,res)=>{


    model.find({CODE:req.body.CODE}).then((data)=>{

        //let segregated_data = segregateData(data);
        res.send( JSON.stringify(data) );

    });


});








//
// router.get("/timetable/fetch",(req,res)=>{
//     //add timetable looking up TODO
//
//     profileModel.findOne( {email:req.session.email} ).then( (data)=>{
//
//
//         //to calculate total number of credits
//         var credits = (elements)=>{
//
//             var summ=0;
//
//             for(element of elements){
//                 summ += parseInt(element.CREDITS);
//             }
//             return summ;
//         }
//
//         res.json({data:data.courses,credits:credits(data.courses)});
//     }).catch(err=>console.log(err));
//
// });





// //deletes an element after clicking on a specific button
// router.delete('/timetable/del',(req,res)=>{
//
//   console.log(req.body);
//
//   if(req.body._id === undefined){
//     profileModel.update({email:req.session.email}, { $set : {courses: [] }} , {multi:true} ).then(()=>{
//       return res.send("Deleted courses array");
//     }).catch(console.log);
//   }
//
//     profileModel.update( {email:req.session.email},{$pull: {courses:{_id:req.body._id}} }  ).then( ()=>{
//
//         console.log("removed course!");
//
//         //TODO res.redirect('/timetable') but it doesnt work
//         res.send("Deleted course")//res.redirect("/timetable");
//
//     }).catch( (err)=>{
//         console.log(err);
//     });
//
//
// });
//




module.exports = router;
