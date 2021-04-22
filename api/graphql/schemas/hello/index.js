const graphql = require('graphql');
const { rootResolvers } = require('../../resolvers');

/**
 * first example of graphql schema
 * @param { object } type return type of schema (graphQLScalarType object)
 * @param { string } description a message from server
 * @param { function } resolve a function to fulfill the request and return a response
 */
module.exports.hello = {
    type: graphql.GraphQLString,
    description: 'A welcome message from server',
    resolve: rootResolvers.helloController 
}