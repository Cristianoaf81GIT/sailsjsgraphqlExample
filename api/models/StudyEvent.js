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
      description: 'assunto a ser estudado'
    },
    source: {
      type: 'string',
      required: true,
      isIn: ['ONLINE_COURSE','YOUTUBE','PDF/EBOOK','BOOK'],      
      description: 'fonte de pesquisa: curso online, ebook/pdf, youtube ou outros'
    },
    resourceName: {
      type: 'string',
      required: true,
      description: 'nome do curso/livro/pdf'
    },
    link: {
      type: 'string',
      isURL: true,
      description: 'caso o recurso de estudo possua um endereço web'
    },
    image: {
      type: 'string',
      description: 'imagem do livro/curso/ebook - não obrigatório'      
    },
    estimatedTime: {
      type: 'number',
      description: 'tempo estimado para conclusão do curso/livro/ebook'
    },
    isConcluded: {
      type: 'boolean',
      defaultsTo: false,
      description: 'o curso/livro/ebook foi concluído?'
    },
    conclusionDate: {
      type: 'number',
      description: 'data de conclusão do curso/livro/ebook'
    },  
    user: {
      model: 'user',
      description: 'a qual usuário publicou'
    }
  }
};

