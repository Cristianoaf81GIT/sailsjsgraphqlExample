/**
 * StudyEvent.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
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
    subject: {
      type: 'string',
      required: true,
      description: 'subject to be studied'
    },
    source: {
      type: 'string',
      required: true,
      isIn: ['ONLINE_COURSE','YOUTUBE','PDF/EBOOK','BOOK'],      
      description: 'research source: online course, ebook / pdf, youtube or others'
    },
    resourceName: {
      type: 'string',
      required: true,
      description: 'name of the course / book / pdf'
    },
    link: {
      type: 'string',
      isURL: true,
      description: 'if the study resource has a web address'
    },
    image: {
      type: 'string',
      description: 'book / course / ebook image - not required'      
    },
    estimatedTime: {
      type: 'number',
      description: 'tempo estimado para conclusão do curso/livro/ebook'
    },
    isConcluded: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Has the course / book / ebook been completed?'
    },
    conclusionDate: {
      type: 'number',
      description: 'date of completion of the course / book / ebook'
    },  
    user: {
      model: 'user',
      description: 'which user is the owner'
    }
  }
};

