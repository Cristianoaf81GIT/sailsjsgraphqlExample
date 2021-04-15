const graphql = require('graphql');
const { rootResolvers } = require('../../resolvers');


const timeStampValue = value => {
    if ( new Date(Number(value)).getTime() > 0 )
        return value;
}

const TimeStampType = new graphql.GraphQLScalarType({
    name: 'User_Datetime',
    description: 'timestamp value',
    serialize: timeStampValue,
    parseValue: timeStampValue,
    parseLiteral(data) {
        return new Date(Number(data.value)).getTime();
    }
});

const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'User object',
    fields: {
        id: { type: graphql.GraphQLInt, description: 'User id' },
        fullName: { type: graphql.GraphQLString, description: 'User fullName' },
        email: { type: graphql.GraphQLString, description: 'User e-mail' },
        createdAt: { type: TimeStampType, description: 'User creation date (in timestamp)' },
        updatedAt: { type: TimeStampType, description: 'User\'s last update date (in timestamp)' }     
    }
});

const longNumberSerialize = value => Number(value);

const numericType = new graphql.GraphQLScalarType({
    name: 'User_numeric',
    description: 'Long positive integer',
    serialize: longNumberSerialize,
    parseValue: longNumberSerialize,
    parseLiteral(data) {
        return Number(data.value);
    }
});

const userCreate = {
    type: UserType,
    description: 'Create a new user',
    args: {
        fullName: { type: graphql.GraphQLString, description: 'User fullName' },
        email: { type: graphql.GraphQLString, description: 'User e-mail' },
        password : { type: numericType, description: 'User numeric password' },
    },
    resolve: rootResolvers.createUser
}

const userLogin = {
    type: graphql.GraphQLString,
    description: 'User\'s login query',
    args: {
        email: { type: graphql.GraphQLString, description: 'User e-mail' },
        password: { type: numericType, description: 'User numeric password'}
    },
    resolve: rootResolvers.login
}

const userUpdate = {
    type: UserType,
    description: 'Update a existing user',
    args: {
        fullName: { type: graphql.GraphQLString, description: 'User fullName' },
        email: { type: graphql.GraphQLString, description: 'User e-mail' },
        password : { type: numericType, description: 'User numeric password' },
    },
    resolve: rootResolvers.updateUser
}

module.exports =  {
    userCreate,
    userLogin,
    userUpdate      
}