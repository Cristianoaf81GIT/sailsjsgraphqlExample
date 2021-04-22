/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { 
    UserService: { 
        getLoggedUser,
        validateUserData,
        validateLoginData,
        validateOnUpdate 
    },
    TranslateService 
} = require('../../services');


module.exports = {
    /***
     * Create a new User
     * @param { any } _ any, you can ignore
     * @param { object } args request arguments object
     * @param { object } context application context with express.Request, 
     * express.Response. express.nextFunction
     * @returns { object } user
     */
    createUser: async (_, args, context ) => {
        
        let isValid = await validateUserData(args,context);
        
        if (isValid) {
            const user = await User.create(args)
                .intercept('E_UNIQUE', 
                    () => {
                    
                        const error = { 
                            message: TranslateService(
                                context,
                                'user.create.validate.email.in.use'
                            )
                        };

                        return new Error(error.message); 

                    }
                ).fetch();

            return user;
        }

        
        const error = {
            message: TranslateService(
                context,
                'user.create.fail.message'
            )
        };
        
        return new Error(error.message);   
    },
    
    /***
     * Login
     * @param { any } _ any, you can ignore
     * @param { object } args request arguments object
     * @param { object } context application context with express.Request, 
     * express.Response. express.nextFunction
     * @returns { string } token 
     */
    login: async (_, args, context) => {
        
        const password = args.password || null;
        const email = args.email || null;
        
        const isValid = await validateLoginData(email, password, context);

        if (!isValid) {
            
            const error = {
                message: TranslateService(
                    context, 
                    'user.login.invalid.login.data'
                )
            };

            throw new Error(error.message);

        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            
            const error = {
                message: TranslateService(
                    context, 
                    'user.login.user.not.found'
                )
            };

            throw new Error(error.message);

        }

        const passwordCheck = await sails
            .helpers
            .user
            .checkPassword(password, user.password);

        if (!passwordCheck.status) {
            
            const error = {
                message: TranslateService(
                    context,
                    'user.login.incorrect.password'
                )
            };

            throw new Error(error.message);

        }
        // generate user access token
        const token = await sails.helpers.user.getToken(user.id);
        if (!token) {
            
            const error = {
                message: TranslateService(
                    context,
                    'user.login.fail.to.login'
                )
            };

            throw new Error(error.message);

        }   

        return token;

    },

    /***
     * Update User
     * @param { any } _ any, you can ignore
     * @param { object } args request arguments object
     * @param { object } context application context with express.Request, 
     * express.Response. express.nextFunction
     * @returns { object } user
     */
    updateUser: async (_, args, context) => {
        
        const loggedUser = await getLoggedUser(context); 
        
        if (!loggedUser) {
            
            const error = {
                message: TranslateService(
                    context, 
                    'user.login.forbidden'
                )
            };

            throw new Error(error.message);

        }
        
        const isValid = await validateOnUpdate(args,context);
        
        if (!isValid) {
            
            const error = {
                message: TranslateService(
                    context, 
                    'user.create.fail.message'
                )
            };

            throw new Error(error.message);

        }
        
        
        const fullName = args.fullName || undefined;
        const email = args.email || undefined;
        const password = args.password || undefined;
        if (fullName && email && password) {
            const user = await User
                .updateOne({id: loggedUser.id})
                .set({fullName, email, password});
            
            return user;
        } else {
            
            const error = {
                message: TranslateService(
                    context, 
                    'user.create.fail.message'
                )
            };

            throw new Error(error.message);

        }       
    },
    
    /***
     * Delete User
     * @param { any } _ any, you can ignore
     * @param { object } _args request arguments object
     * @param { object } context application context with express.Request, 
     * express.Response. express.nextFunction
     * @returns { object } user
     */
    deleteUser: async (_, _args, context) => {

        const loggedUser = await getLoggedUser(context); 
        
        if (!loggedUser) {
            
            const error = {
                message: TranslateService(
                    context, 
                    'user.login.forbidden'
                )
            };

            throw new Error(error.message);

        }

        const user = await User.destroyOne({ id: loggedUser.id });

        return user;
    }
};

