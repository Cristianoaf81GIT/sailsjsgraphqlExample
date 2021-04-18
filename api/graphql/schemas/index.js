const { hello } = require('./hello');
const { userCreate,userLogin, userUpdate } = require('./user');
const { studyEventCreate, studyEventUpdate, studyEventDelete, studyEventGetAll } = require('./study');
const {GraphQLObjectType } = require('graphql');


module.exports.rootQuery = new GraphQLObjectType({
    name: 'Query',    
    fields: {
        hello,
        userCreate,
        userLogin,
        userUpdate,
        studyEventCreate,
        studyEventUpdate,
        studyEventDelete,
        studyEventGetAll                    
    }
}) 