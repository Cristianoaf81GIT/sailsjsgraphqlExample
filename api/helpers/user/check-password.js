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

 /**
  * function fn, helper that check\'s if user password 
  * string match to encripted password 
  * @param {object} inputs  object - with properties {password: string,
  *  hashed: string}
  * @param {object} exits object - with properties {succes: function}
  * @returns {object} object - with properties {status: boolean}
  */
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

