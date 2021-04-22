const { hello } = require('./hello');

const { 
    userCreate,
    userLogin, 
    userUpdate,
    userDelete
} = require('./user');

const { 
    studyEventCreate, 
    studyEventUpdate, 
    studyEventDelete, 
    studyEventGetAll, 
    studyEventGetById 
} = require('./study');

const {GraphQLObjectType } = require('graphql');

/**
 * condenses all schemas as a single query
 */
module.exports.rootQuery = new GraphQLObjectType({
    name: 'Query',    
    fields: {
        hello,
        userCreate,
        userLogin,
        userUpdate,
        userDelete,
        studyEventCreate,
        studyEventUpdate,
        studyEventDelete,
        studyEventGetAll,
        studyEventGetById                    
    }
}) 