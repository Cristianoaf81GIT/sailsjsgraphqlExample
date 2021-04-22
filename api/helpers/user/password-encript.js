const bcript = require('bcrypt');
module.exports = {


  friendlyName: 'Password encript',


  description: 'User password encriptation',


  inputs: {
    password: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  /**
  * function fn, helper that encript user password
  * @param {object} inputs  object - with properties {password: string}
  * @param {object} exits object - with properties {succes: function}
  * @returns {string} hash - a string containing encripted user password
  */
  fn: async function (inputs, exits) {
    const password = inputs.password;
    bcript.hash(password,10).then((hash) => {
      if (hash)
        return exits.success(hash);
      else
        return exits.success(new Error('não foi possível encriptar a senha'));
    });    
    
  }

};

