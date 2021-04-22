const yup = require("yup");
const path = require("path");
const { translate } = require("../localization");

/**
 * Help validate User\'s data before crud operations
 * @author cristiano faria <cristianoaf81@hotmail.com>
 */
class UserService {
  /**
   * method validateUserData
   * @param {object} userData object with properties {fullName: string,
   * email: string, password: string}
   * @param {object} context object - with properties {req: express.Request,
   * res: express.Response, next: express.NextFunction}
   * @returns {boolean} isValid
   */
  validateUserData = async function (userData, context) {
    const fullNameRequiredError = translate(
      context,
      "user.create.validate.fullName"
    );
    const fullNameLengthError = translate(
      context,
      "user.create.validate.fullName.length"
    );
    const emailMessageError = translate(context, "user.create.validate.email");
    const passwordRequiredError = translate(
      context,
      "user.create.validate.password.required"
    );
    const passwordLenghtError = translate(
      context,
      "user.create.validate.password.min.length"
    );
    const passwordNumericError = translate(
      context,
      "user.create.validate.password.is.numeric"
    );

    let isValid = false;

    const schema = yup.object().shape({
      fullName: yup
        .string()
        .min(3, fullNameLengthError)
        .required(fullNameRequiredError),
      email: yup.string().required(emailMessageError),
      password: yup
        .string()
        .required(passwordRequiredError)
        .min(6, passwordLenghtError)
        .matches(/^[0-9]+$/g, passwordNumericError),
    });

    await schema
      .isValid({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      })
      .then((valid) => {
        isValid = valid;
      });

    return isValid;
  };

  /**
   * method validateLoginData
   * @param {string} email string - user email
   * @param {string} password  number - user password
   * @param {object} context object - with properties {req: express.Request,
   * res: express.Response, next: express.NextFunction}
   * @returns {boolean} isValid
   */
  validateLoginData = async function (email, password, context) {
    const emailMessageError = translate(context, "user.create.validate.email");
    const passwordRequiredError = translate(
      context,
      "user.create.validate.password.required"
    );
    const passwordLenghtError = translate(
      context,
      "user.create.validate.password.min.length"
    );
    const passwordNumericError = translate(
      context,
      "user.create.validate.password.is.numeric"
    );

    let isValid = false;

    const schema = yup.object().shape({
      email: yup
        .string()
        .required(emailMessageError)
        .matches(/[a-zA-Z0-9]+\@+[a-zA-Z]/g, emailMessageError),
      password: yup
        .string()
        .required(passwordRequiredError)
        .min(6, passwordLenghtError)
        .matches(/^[0-9]+$/g, passwordNumericError),
    });

    await schema
      .isValid({
        email: email,
        password: String(password),
      })
      .then((valid) => {
        isValid = valid;
      });

    return isValid;
  };

   /**
   * method  validateOnUpdate
   * @param {object} userData object with properties {fullName: string,
   * email: string, password: string}
   * @param {object} context object - with properties {req: express.Request,
   * res: express.Response, next: express.NextFunction}
   * @returns {boolean} isValid
   */
  async validateOnUpdate(userData, context) {
    const fullNameLengthError = translate(
      context,
      "user.create.validate.fullName.length"
    );
    const emailMessageError = translate(context, "user.create.validate.email");
    const passwordLenghtError = translate(
      context,
      "user.create.validate.password.min.length"
    );
    const passwordNumericError = translate(
      context,
      "user.create.validate.password.is.numeric"
    );

    let isValid = false;

    const schema = yup.object().shape({
      fullName: yup.string().min(3, fullNameLengthError),
      email: yup
        .string()
        .matches(/[a-zA-Z0-9]+\@+[a-zA-Z]/g, emailMessageError),
      password: yup
        .string()
        .min(6, passwordLenghtError)
        .matches(/^[0-9]+$/g, passwordNumericError),
    });

    await schema
      .isValid({
        fullName: userData.fullName,
        email: userData.email,
        password: String(userData.password),
      })
      .then((valid) => {
        isValid = valid;
      });

    return isValid;
  }

  /**
   *  method that returns logged user
   * @param {object} context object - with properties {req: express.Request,
   * res: express.Response, next: express.NextFunction}
   * @returns {object} user
   */
  getLoggedUser = async function (context) {
    const user = context.req.user || undefined;
    return user;
  };
}

module.exports.UserService = new UserService();
