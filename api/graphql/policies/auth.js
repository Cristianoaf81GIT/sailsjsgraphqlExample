const jwt = require('jsonwebtoken');

/**
 * Middleware for authentication and users
 * @example
 *  // set req.user param
 *  // req.user = { id: Number, email: string }
 * @param { object } req express.Request 
 * @param { Object } _res express.Response
 * @param { function } next express.NextFunction
 */
module.exports.authPolicie = async (req, _res, next) => {
  let user = undefined;  
  if (req.headers.authorization || req.headers.Authorization) {
      const token = req.headers.authorization.split('Bearer ')[1];
      if (token && token.length > 0) {
          jwt.verify(token, sails.config.secret, async (_err, payload) => {
            if (payload && payload.data) {
                user = await User.findOne({id: payload.data});
                if (user && user.id) {
                    req.user = {
                        id: user.id,
                        email: user.email    
                    };                
                    next();
                }
            } else {
                next();
            }
          });
      } 
  } else {
    next();
  }  
  
};
