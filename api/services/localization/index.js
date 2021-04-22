/**
 * function translate, help to translate error and messages before return to client
 * @param {object} context object - with properties: {req: express.Request,
 * res: express.Response, next: express.NextFunction}
 * @param {string} text string - json index that contain translated text
 * @returns {string} text - a string with translated text
 */
module.exports.translate = function (context, text) {
  if (
    context.req.params &&
    context.req.params.language &&
    context.req.params.language === "pt"
  )
    context.req.params.language += "-br";
  context.req.i18n.setLocale(
    context.req.params.language || sails.config.i18n.defaultLocale
  );
  const { __: i18n } = context.res.locals;
  return i18n(text);
};
