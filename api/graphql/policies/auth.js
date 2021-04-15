const jwt = require('jsonwebtoken');
/**
 * Middleware que independente de possuir ou não o token
 * permitirá a passagem para o próximo item da cadeia
 * obs: em rotas onde o login é necessário deveremos 
 * verificar o contexto 
 * ex: if (context.req.user) {
 *  pode passar
 * } else {
 *  barra a requisicao
 * }
 * @param { express.Request } req 
 * @param { express.Response } _res 
 * @param { express.NextFunction } next 
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
