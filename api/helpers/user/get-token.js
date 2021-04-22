const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Get token',


  description: 'Generate access token for user and return it',


  inputs: {
    data: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Token',
    },

  },

  /**
  * function fn, helper that generate user access token
  * @param {object} inputs  object - with properties {data: number}
  * @param {object} exits object - with properties {succes: function}
  * @returns {string} token - a string containing user access token
  */
  fn: async function (inputs, exits) {
    // Get token.
    const token = jwt.sign({data: inputs.data}, sails.config.secret, {expiresIn: '3h'});    
    return exits.success(token);
  }


};

