const model = require("../db/model").courseModel;
const router = require("express").Router();


router.get("/",(req,res)=>{
    res.render("timetable2");
});





/**
 * 
 * @api {post} /timetable fetch timetable
 * @apiName fetch timetable
 * @apiGroup no-signup
 * 
 * @apiParam {string} CODE course code
 * 
 * @apiParamExample {json} request-example
 * {
	"CODE":"MAT2001"
}
 * 
 */
router.post("/timetable",(req,res)=>{

console.log(req.body);
    model.find({CODE:req.body.CODE}).then((data)=>{
        //let segregated_data = segregateData(data);
        res.send( JSON.stringify(data) );

    });


});



module.exports = router;
