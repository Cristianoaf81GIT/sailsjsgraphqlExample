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

