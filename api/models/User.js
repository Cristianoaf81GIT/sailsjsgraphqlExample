/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const { format } = require('date-fns');

module.exports = {

  attributes: {
    createdAt: {
      type: 'number',
      autoCreatedAt: true
    },
    updatedAt: {
      type: 'number',
      autoUpdatedAt: true,
    },    
    email: {
      type: 'string',
      unique: true,
      required: true,
      isEmail: true
    },
    fullName: {
      type: 'string',
      required: true
    }, 
    password: {
      type: 'string',
      required: true
    },
    studies: {
      collection: 'studyevent',
      via: 'user'
    }      

  },
  customToJSON: function() {
    const createdAt = format(this.createdAt,'dd/MM/yyyy');
    this.createdAt = createdAt;   
    return __.omit(this, ['password','updatedAt']);
  },
  beforeCreate: async function(_valuesToSet, proceed) {
    const password = _valuesToSet.password;
    const hash = await sails.helpers.user.passwordEncript(password);
    
    if (typeof hash  === 'string') {
      _valuesToSet.password = hash;          
    }

    proceed();
  },
  beforeUpdate: async function(_valuesToSet, proceed) {
   if (_valuesToSet.password && _valuesToSet.password.length > 0) {
    const password = _valuesToSet.password;
    const hash = await sails.helpers.user.passwordEncript(password);
    
    if (typeof hash  === 'string') {
      _valuesToSet.password = hash;          
    }
   }

    proceed();
  }

};

