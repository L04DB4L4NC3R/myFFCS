const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLSchema
} = require("graphql");


const courseModel = require("../db/model").courseModel;


const CourseType = new GraphQLObjectType({
    name:"Courses",
    fields:()=>({
        VENUE:{type:GraphQLString},
        CODE:{type:GraphQLString},
        TITLE:{type:GraphQLString},
        TYPE:{type:GraphQLString},
        CREDITS:{type:GraphQLInt},
        SLOT:{type:GraphQLString},
    })
});


const CourseTypeSpecific = new GraphQLObjectType({
    name:"SpecificCourses",
    fields:()=>({

    })
})




const TeacherType = new GraphQLObjectType({
    name:"Teacher",
    fields:()=>({
        VENUE:{type:GraphQLString},
        CODE:{type:GraphQLString},
        TITLE:{type:GraphQLString},
        TYPE:{type:GraphQLString},
        CREDITS:{type:GraphQLInt},
        SLOT:{type:GraphQLString},
        FACULTY:{type:GraphQLString}
    })
})



const CodeType = new GraphQLObjectType({
    name:"Code",
    fields:()=>({
        VENUE:{type:GraphQLString},
        CODE:{type:GraphQLString},
        TITLE:{type:GraphQLString},
        TYPE:{type:GraphQLString},
        CREDITS:{type:GraphQLInt},
        SLOT:{type:GraphQLString},
        FACULTY:{
            type:new GraphQLList(TeacherType),
            args:{name:{type:GraphQLString}},
            resolve(parent,args){
                return courseModel.find({FACULTY:args.name,CODE:parent.CODE});
            }   
        }
    })
})








const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:()=>({
        courses:{
            type:new GraphQLList(CourseType),
            resolve(parent,args){
                return courseModel.find({});
            }
        },
        faculty:{
            type:new GraphQLList(TeacherType),
            args:{name:{type:GraphQLString}},
            resolve(parent,args){
                return courseModel.find({FACULTY:args.name})
            }
        },
       
        course:{
            type:new GraphQLList(CodeType),
            args:{code:{type:GraphQLString}},
            resolve(parent,args){
                return courseModel.find({CODE:args.code});
            }
        }   
    })
});





module.exports = new GraphQLSchema({
    query:RootQuery
});