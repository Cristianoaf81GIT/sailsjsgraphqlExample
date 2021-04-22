const graphql = require('graphql');
const { rootResolvers } = require('../../resolvers');


/**
 * function to serialize and parse a string timestamp to js Date timestamp
 * @param { string } value number in string format representing a timestamp 
 * @returns {number} value
 */
const timeStampValue = value => {
    if ( new Date(Number(value)).getTime() > 0 )
        return value;
}

/**
 * GraphQLScalarType TimeStampType
 * @param { string } name string - scalarType\'s name
 * @param { string } description string - ScalarType\'s description
 * @param { function } serialize function - function to serialize a string value 
 * @param { function } parseValue function - function to parse a string value to number
 * @param { function } parseLiteral function - function to convert string value to literal\'s number
 */
const TimeStampType = new graphql.GraphQLScalarType({
    name: 'User_Datetime',
    description: 'timestamp value',
    serialize: timeStampValue,
    parseValue: timeStampValue,
    parseLiteral(data) {
        return new Date(Number(data.value)).getTime();
    }
});

/**
 * GraphQLObjectType User
 * @param {string} name string - name of object type
 * @param {string} description string - description of object
 * @param {{
 *  id: number,
 *  fullName: string,
 *  email: string,
 *  createdAt: number,
 *  updatedAt: number
 * }} fields  object - fields representing a User data
 */
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'User object',
    fields: {
        id: { 
            type: graphql.GraphQLInt, 
            description: 'User id' 
        },
        fullName: { 
            type: graphql.GraphQLString, 
            description: 'User fullName' 
        },
        email: { 
            type: graphql.GraphQLString, 
            description: 'User e-mail' 
        },
        createdAt: { 
            type: TimeStampType, 
            description: 'User creation date (in timestamp)' 
        },
        updatedAt: { 
            type: TimeStampType, 
            description: 'User\'s last update date (in timestamp)' 
        }     
    }
});

/**
 * function to serialize and parse a string timestamp to js Date timestamp
 * @param { string } value number in string format representing a timestamp 
 * @returns {number} value
 */
const longNumberSerialize = value => Number(value);

/**
 * graphQLScalarType NumericType
 * @param { string } name string - GraphQLScalarType\'s name
 * @param { string } description string - GraphQLScalarType\'s description
 * @param { function } serialize function - function to serialize a string value
 * @param { function } parseValue function - function to parse a string value to number
 * @param { function } parseLiteral function - function to convert value string to literal\'s number
 */
const NumericType = new graphql.GraphQLScalarType({
    name: 'User_numeric',
    description: 'Long positive integer',
    serialize: longNumberSerialize,
    parseValue: longNumberSerialize,
    parseLiteral(data) {
        return Number(data.value);
    }
});

/**
 * GraphQLSchema userCreate
 * @param {object} type  object - GraphQLObjectType
 * @param {string} description string - schema\'s description
 * @param {object} args object - with properties: {fullName: string, email: string, password: number}
 * @param {function} resolve function to receive request and send response
 */
const userCreate = {
    type: UserType,
    description: 'Create a new user',
    args: {
        fullName: { 
            type: graphql.GraphQLString, 
            description: 'User fullName' 
        },
        email: { 
            type: graphql.GraphQLString, 
            description: 'User e-mail' 
        },
        password : { 
            type: NumericType, 
            description: 'User numeric password' 
        },
    },
    resolve: rootResolvers.createUser
}

/**
 * GraphQLSchema userLogin
 * @param {object} type GraphQLObjectType UserType
 * @param {string} description string - schema\'s description
 * @param {object} args object - with properties: {email: string, password: number} 
 * @param {function} resolve function to receive request and send response
 */
const userLogin = {
    type: graphql.GraphQLString,
    description: 'User\'s login query',
    args: {
        email: { 
            type: graphql.GraphQLString, 
            description: 'User e-mail' 
        },
        password: { 
            type: NumericType, 
            description: 'User numeric password'
        }
    },
    resolve: rootResolvers.login
}

/**
 * GraphQLSchema userUpdate
 * @param {object} type GraphQLObjectType UserType
 * @param {string} description string - schema\'s description
 * @param {object} args object - with properties: {fullName: string,email: string, password: number}
 * @param {function} resolve function to receive request and send response
 */
const userUpdate = {
    type: UserType,
    description: 'Update a existing user',
    args: {
        fullName: { 
            type: graphql.GraphQLString, 
            description: 'User fullName' 
        },
        email: {
             type: graphql.GraphQLString, 
             description: 'User e-mail' 
            },
        password : { 
            type: NumericType, 
            description: 'User numeric password' 
        },
    },
    resolve: rootResolvers.updateUser
}

/**
 * GraphQLSchema userDelete 
 * @param {object} type GraphQLObjectType UserType
 * @param {string} description string - schema\'s description
 * @param {function} resolve function to receive request and send response
 */
const userDelete = {
    type: UserType,
    description: 'Delete user',
    resolve: rootResolvers.deleteUser
}

module.exports =  {
    userCreate,
    userLogin,
    userUpdate,
    userDelete      
}