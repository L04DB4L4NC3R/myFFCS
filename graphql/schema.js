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
        venue:{type:GraphQLString},
        code:{type:GraphQLString},
        title:{type:GraphQLString},
        type:{type:GraphQLString},
        credits:{type:GraphQLInt},
        slot:{type:GraphQLString},
        faculty:{type:GraphQLString}
    })
});




const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:()=>({
        courses:{
            type:CourseType,
            resolve(parent,args){
                return courseModel.find({});
            }
        }
    })
});





module.exports = new GraphQLSchema({
    query:RootQuery
});