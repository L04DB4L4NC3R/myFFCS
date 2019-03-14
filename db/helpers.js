const bcrypt = require("bcrypt");
const { 
    profileModel,
    courseModel
 } = require("./model");
const salt = 10;



//Function to segregate data to lab/theory slots and morning/evening slots
module.exports.segregateData = (data)=>{

    var object = {
        theory:{ morning:[],evening:[] },
        lab:{ morning:[],evening:[]  },
        project:[]
    };

    data.forEach((element)=>{


        //If venue is NIL then it specifies project component of the course
        if(element.VENUE === 'NIL'){
            object.project.push(element);
        }


        //If SLOT starts with L then its a lab slot
        else if(element.SLOT[0]==='L')
            {
                var n = element.SLOT.length;

                if( element.SLOT[n-2] === 'L' || element.SLOT[n-2] === '1' || element.SLOT[n-2] === '2' || (element.SLOT[n-2] === '3' && element.SLOT[n-1] === '0') )
                    object.lab.morning.push(element);

                //if L31 onwards then evening
                else
                    object.lab.evening.push(element);
            }

        //for theory slots
        else
            {
                //if last character of a theory class is '1' then its morning slot
                if( element.SLOT[ element.SLOT.length -1] === '1' )
                    object.theory.morning.push(element);
                else
                    object.theory.evening.push(element)
            }
    });

    //change this to return segregated_data
    return object;
}







//to generate a hash
module.exports.hashAndSave = (obj)=>{

    return new Promise((resolve,reject)=>{

        bcrypt.hash(obj.passwd, salt, (err, hash)=> {

            obj.passwd = hash;

            obj.save().then(()=>{
                console.log("Save profile info");
                resolve("Saved");
            }).catch((err)=>{
                reject(err);
            });

        });



    });



}



//checks for slot clash
module.exports.checkClash = (slots,string)=>{

    for( slot of slots ){

        if( string.indexOf(slot)!==-1 )
            return slot;
    }
    return false;
}




module.exports.verifyRoute = (req,res,next)=>{

    if(req.session.email===undefined) res.sendStatus(403);
    else next();
}


// probe course limit
module.exports.probeCourseLimit = (query) =>{
    return new Promise((resolve, reject) => {
        courseModel.findOne(query)
        .then((c) => {
            if(c.COUNT >= parseInt(process.env.COURSE_LIMIT)) {
                console.log("er")
                reject("Course limit was reached");
            }
            else {
                console.log(c)
                resolve()
            }
        })
    }).catch((err)=>{
        reject(err)
    })
}


// increase course count
module.exports.increaseCourseCount = (query) =>{
    return new Promise((resolve, reject) => {
        courseModel.updateOne(query, {
            $inc: {
                COUNT:1
            }
        })
        .then((c) => {
            if(c.COUNT >= process.env.COURSE_LIMIT)
                reject("Course limit was reached");
            else 
                resolve("Within course limit")
        })
    }).catch((err)=>{
        reject(err)
    })
}