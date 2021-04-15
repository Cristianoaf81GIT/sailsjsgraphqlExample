/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { rootQuery } = require('../api/graphql/schemas');
const { authPolicie } = require('../api/graphql/policies/auth');
const i18n = require('i18n-2');
const i18nOptions = {
  directory: require('path').resolve(__dirname, '.', 'locales'),
  extension: '.json',
  locales: ['en', 'pt-br', 'es']
};
module.exports.bootstrap = async function(done) {
  // aplica middleware de autenticacao
  sails.hooks.http.app.use(authPolicie);
  
  // adiciona suporte manualmente ao i18n-2
  i18n.expressBind(sails.hooks.http.app, i18nOptions);

  //https://dev.to/aflatoon2874/how-to-integrate-graphql-with-sailsjs-application-3obh
  sails.hooks.http.app.use('/graphql/:language?', 
    graphqlHTTP( (req, res, next) => ({
      schema: new GraphQLSchema({query: rootQuery}),
      context: {req,res,next},
      customFormatErrorFn: (err) => err.message,
      graphiql: true   
    })
  ));
  
  
  return done();

};
