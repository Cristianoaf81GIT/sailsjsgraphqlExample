/**
 * StudyEventController
 * @author cristiano alexandre <cristianoaf81@hotmail.com>
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { 
  TranslateService , 
  UserService, 
  StudyEventService 
} = require('../../services');

module.exports = {
  /**
   * create a new StudyEvent
   * @param { any } _ any, you can ignore
   * @param { object } args object with request arguments,
   * @param { object } context object with request, response and 
   * express next Function
   * @returns { object } StudyEvent
  */
  createStudyEvent: async (_, args, context) => {
    const loggedUser = await UserService.getLoggedUser(context);
   
    if (!loggedUser || !loggedUser.id) {
        
      const error = { 
          message: TranslateService(context, 'user.login.forbidden')
        };

        throw new Error(error.message);
    }
    
    const isValid = await StudyEventService
      .validateStudyEventDataOnCreate(args,context);
   
    if (!isValid) {
        
      const error = { 
          
        message: TranslateService(
          context, 
          'study.event.validate.create.invalid.args'
        )

      };
      
      throw new Error(error.message);

    }    

    const user = await User.findOne({id: loggedUser.id});

    const studyEvent = await StudyEvent
      .create({...args, user: user.id}).fetch();

    studyEvent.user = user;

    return studyEvent;
  },

  /**
   * Update StudyEvent
   * @param { any } _ any, you can ignore
   * @param { object } args object with request arguments,
   * @param { object } context object with request, response and 
   * express next Function
   * @returns { object } StudyEvent
  */
  updateStudyEvent: async (_, args, context) => {

    const loggedUser = await UserService.getLoggedUser(context);
        
    if (!loggedUser || !loggedUser.id) {
      
      const error = { 
        message: TranslateService(context, 'user.login.forbidden')
      };

      throw new Error(error.message);

    }    
   
    const isValid = await StudyEventService
      .validateStudyEventDataOnUpdate(args,context);
    
    if (!isValid) {
        const error = { 
          message: TranslateService(
            context, 
            'study.event.validate.create.invalid.args')
              .replace('%s', args.id)
        };

        throw new Error(error.message);
    }
    
    const foundStudyEvent = await StudyEvent
      .findOne({id: args.id, user: loggedUser.id});

    if (!foundStudyEvent) {
      
      const error = { 
        message: TranslateService(context, 'study.event.not.found') 
      };

      throw new Error(error.message);
    }    
   
    const valuesToSet = {
      ...args,
      conclusionDate: Number(args.conclusionDate) > -1 ? 
        Number(args.conclusionDate) : 
        Number(foundStudyEvent.conclusionDate)
      
    }
    
    const UpdatedStudyEvent = await StudyEvent
      .updateOne({id: args.id}).set(valuesToSet);
    
    return UpdatedStudyEvent;

  },

   /**
   * Delete StudyEvent
   * @param { any } _ any, you can ignore
   * @param { object } args object with request arguments,
   * @param { object } context object with request, response and 
   * express next Function
   * @returns { object } StudyEvent 
   * */
  deleteStudyEvent: async (_, args, context) => {

    const loggedUser = await UserService.getLoggedUser(context);
      
    if (!loggedUser || !loggedUser.id) {
      
      const error = { 
        message: TranslateService(context, 'user.login.forbidden')
      };

      throw new Error(error.message);

    }  
    
    const isValid = await StudyEventService
      .validateStudyEventDataOnDelete(args,context);
    
    
    if (!isValid) {
      
      const error = { 
        message: TranslateService(
          context, 
          'study.event.validate.id.required'
        )
      };

      throw new Error(error.message);
    }

    const foundStudyEvent = await StudyEvent
      .findOne({id: args.id, user: loggedUser.id});
    
    if (!foundStudyEvent) {
      
      const error = { 
        message: TranslateService(context, 'study.event.not.found')
          .replace('%s', args.id) 
      };

      throw new Error(error.message);
    }   

    let deletedStudyEvent = await StudyEvent
      .destroyOne({id: args.id, user: loggedUser.id});
    
    const owner = User.findOne({id: loggedUser.id});
    
    deletedStudyEvent = {
      ...deletedStudyEvent,
      user: owner
    };

    return deletedStudyEvent;

  },

   /**
   * Get all StudyEvents
   * @param { any } _ any, you can ignore
   * @param { object } args object with request arguments,
   * @param { object } context object with request, response and 
   * express next Function
   * @returns { Array<StudyEvent> } array StudyEvents 
   * */
  getAllStudyEvents: async (_, _args, context) => {
    
    const loggedUser = await UserService.getLoggedUser(context);

    if (!loggedUser || !loggedUser.id) {
      
      const error = { 
        message: TranslateService(context, 'user.login.forbidden')
      };

      throw new Error(error.message);

    }

    const UserStudyEvents = await StudyEvent
      .find({ user: loggedUser.id });
    
    return UserStudyEvents;

  },

  /**
   * Get StudyEvent by id
   * @param { any } _ any, you can ignore
   * @param { object } args object with request arguments,
   * @param { object } context object with request, response and 
   * express next Function
   * @returns { object } StudyEvent 
   * */
  getStudyEventById: async (_, args, context) => {
    
    const loggedUser = await UserService.getLoggedUser(context);

    if (!loggedUser || !loggedUser.id) {
      
      const error = { 
        message: TranslateService(context, 'user.login.forbidden')
      };

      throw new Error(error.message);

    }

    const isValid = await StudyEventService
      .validateStudyEventDataOnDelete(args,context);

    if ( !isValid ) {
      
      const error = { 
        message: TranslateService(context, 'study.event.validate.id.required')
      };

      throw new Error(error.message);
      
    }
    
    var UserStudyEvent = await StudyEvent
      .findOne({id: args.id, user: loggedUser.id});
    
    const owner = await User.findOne({id: loggedUser.id});

    UserStudyEvent = {
      ...UserStudyEvent,
      user: owner
    }

    return UserStudyEvent;

  }

};

