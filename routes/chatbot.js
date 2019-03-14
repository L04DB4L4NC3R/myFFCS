const router = require("express").Router();
const courseModel = require("../db/model").courseModel;

// webhook fulfillment
router.post("/chatbot",(req,res)=>{ 
    // in params we need -> code, faculty and slot
    // to extract parameters oout of spoken words
 let params = req.body.queryResult.parameters;

 courseModel.findOne({CODE:params.code, FACULTY: params.faculty, SLOT: params.slot})
 .then((course) => {
     if(!course) {
         return res.status(200).send({
            "fulfillmentText":`No classroom was found with the provided details, try matching exact details`,
            "fulfillmentMessages":[{"text":{"text":[`No classroom was found with the provided details, try matching exact details`]}}],
            "source":""
        });

     } else {
        let count = parseInt(process.env.COURSE_LIMIT) + course.COUNT
        if(count == 0) {
            return res.status(200).send({
                "fulfillmentText":`No more seats left for this class`,
                "fulfillmentMessages":[{"text":{"text":[`No more seats left for this class`]}}],
                "source":""
            });
        }
           // send fullfillment 
        return res.status(200).send({
            "fulfillmentText":`This particular class has ${count} seats left`,
            "fulfillmentMessages":[{"text":{"text":[`This particular class has ${count} seats left`]}}],
            "source":""
        });
     }
 }).catch(console.log)

});


module.exports = router;