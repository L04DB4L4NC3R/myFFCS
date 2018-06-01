const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const profileModel = require("./model").profileModel;
//hash function for storing passwords
const hashAndSave = require("./helpers").hashAndSave;

//To stuff user email into a cookie
passport.serializeUser((user,done)=>{

    done(null,user.email);
});

//to obtain user data from cookie
passport.deserializeUser((user_email,done)=>{

    profileModel.findOne({email:user_email}).then((user)=>{

        done(null,user);
    }).catch(err=>console.log(err));
});


//For GOOGLE+ OAUTH
passport.use(

    new googleStrategy({

        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:process.env.CALLBACK_URL
    } , (accessToken,refreshToken,profile,done)=>{

            profileModel.findOne( {email:profile.displayName} ).then((user)=>{

                //If no specified user existing in DB
                if(!user){

                    var obj = new profileModel({
                        email:profile.displayName,
                        passwd:profile.id,
                        courses:[]
                    });

                    hashAndSave(obj).then(()=>{

                        profileModel.findOne({email:obj.email}).then((user)=>{

                            console.log("saved user to DB");
                            done(null,user);
                        });

                    }).catch(err=>console.log(err));
                }


                else{
                    console.log("Logged in as "+profile.displayName);
                    done(null,user);
                }


            });

    })
)
