const graphql = require('graphql');
const { rootResolvers } = require('../../resolvers');

module.exports.hello = {
    type: graphql.GraphQLString,
    description: 'A welcome message from server',
    resolve: rootResolvers.helloController 
}