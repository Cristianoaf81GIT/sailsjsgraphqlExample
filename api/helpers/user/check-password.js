const bcript = require('bcrypt');
module.exports = {


  friendlyName: 'Check password',


  description: 'User password check helper',


  inputs: {
    password: {
      type: 'string',
      required: true
    },
    hashed: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const match = await bcript
      .compare(inputs.password, inputs.hashed);
      
    if(match) {
      return exits.success({status: true});
    } else {
      return exits.success({status: false});
    }
  }


};

