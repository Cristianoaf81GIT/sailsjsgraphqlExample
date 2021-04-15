/**
 * StudyEventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { TranslateService , UserService, StudyEventService } = require('../../services');
module.exports = {
  createStudyEvent: async (_, args, context) => {
    const loggedUser = await UserService.getLoggedUser(context);
    if (!loggedUser || !loggedUser.id) {
        const error = { message: TranslateService(context, 'user.login.forbidden')};
        throw new Error(error.message);
    }
    
    const isValid = await StudyEventService.validateStudyEventDataOnCreate(args,context);
   
    if (!isValid) {
        const error = { message: TranslateService(context, 'study.event.validate.create.invalid.args')};
        throw new Error(error.message);
    }    

    const user = await User.findOne({id: loggedUser.id});
    const studyEvent = await StudyEvent.create({...args, user: user.id}).fetch();
    studyEvent.user = user;
    return studyEvent;
  },

  updateStudyEvent: async (_, args, context) => {
    const loggedUser = await UserService.getLoggedUser(context);
        
    if (!loggedUser || !loggedUser.id) {
      const error = { message: TranslateService(context, 'user.login.forbidden')};
      throw new Error(error.message);
    }    
   
    const isValid = await StudyEventService.validateStudyEventDataOnUpdate(args,context);
    
    if (!isValid) {
        const error = { 
          message: TranslateService(
            context, 
            'study.event.validate.create.invalid.args')
              .replace('%s', args.id)
        };

        throw new Error(error.message);
    }
    
    const foundStudyEvent = await StudyEvent.findOne({user: loggedUser.id});

    if (!foundStudyEvent) {
      const error = { message: TranslateService(context, 'study.event.not.found') }
      throw new Error(error.message);
    }    
   
    const valuesToSet = {
      ...args,
      conclusionDate: Number(args.conclusionDate) > -1 ? Number(args.conclusionDate) : Number(foundStudyEvent.conclusionDate)
      
    }
    
    const UpdatedStudyEvent = await StudyEvent.updateOne({id: args.id}).set(valuesToSet);
    
    return UpdatedStudyEvent;
  },

  deleteStudyEvent: async (_, args, context) => {
    const loggedUser = await UserService.getLoggedUser(context);
      
    if (!loggedUser || !loggedUser.id) {
      const error = { message: TranslateService(context, 'user.login.forbidden')};
      throw new Error(error.message);
    }  
    
    const isValid = await StudyEventService.validateStudyEventDataOnDelete(args,context);
    
    
    if (!isValid) {
      const error = { message: TranslateService(context, 'study.event.validate.id.required')};
      throw new Error(error.message);
    }

    const foundStudyEvent = await StudyEvent.findOne({id: args.id, user: loggedUser.id});
    
    if (!foundStudyEvent) {
      
      const error = { 
        message: TranslateService(context, 'study.event.not.found')
          .replace('%s', args.id) 
      };

      throw new Error(error.message);
    }   

    let deletedStudyEvent = await StudyEvent.destroyOne({id: args.id, user: loggedUser.id});
    
    const owner = User.findOne({id: loggedUser.id});
    
    deletedStudyEvent = {
      ...deletedStudyEvent,
      user: owner
    };

    return deletedStudyEvent;

  }

};

