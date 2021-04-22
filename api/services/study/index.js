const yup = require("yup");
const { translate } = require("../localization");

/**
 * Help validate StudyEvent\'s data before crud operations
 * @author cristiano faria <cristianoaf81@hotmail.com>
 */
class StudyEventService {
  
  /**
   * method validateStudyEventDataOnCreate
   * @param {object} StudyEventData object with properties {subject: string,
   * source: string, resourceName: string, link: string, image: string,
   * isConcluded: boolean, conclusionDate: Date}
   * @param {object} context object - with properties {req: express.Request,
   * res: express.Response, next: express.NextFunction}
   * @returns {boolean} isValid
   */
  validateStudyEventDataOnCreate = async (StudyEventData, context) => {
    const subjectRequiredError = translate(
      context,
      "study.event.validate.subject"
    );

    const sourceRequiredError = translate(
      context,
      "study.event.validate.source"
    );

    const resourceNameRequiredError = translate(
      context,
      "study.event.validate.resource.name"
    );

    const linkUrlError = translate(context, "study.event.validate.link.url");

    const estimatedTimeNumberError = translate(
      context,
      "study.event.validate.estimate.time.positive"
    );

    const isConcludedBooleanError = translate(
      context,
      "study.event.validate.is.concluded"
    );

    const conclusionDateNumberError = translate(
      context,
      "study.event.validate.conclusion.date.positive"
    );

    let isValid = false;

    const schema = yup.object().shape({
      subject: yup.string().required(subjectRequiredError),
      source: yup.string().required(sourceRequiredError),
      resourceName: yup.string().required(resourceNameRequiredError),
      link: yup.string().url(linkUrlError),
      image: yup.string(),
      estimatedTime: yup.number(estimatedTimeNumberError),
      isConcluded: yup.boolean(isConcludedBooleanError),
      conclusionDate: yup
        .date(conclusionDateNumberError)
        .transform((castValue, originalValue) => {
          return Number.isNaN(originalValue)
            ? castValue
            : new Date(originalValue).getTime();
        }),
    });

    await schema
      .isValid({ ...StudyEventData })
      .then((valid) => (isValid = valid));

    return isValid;
  };

  /**
   * method validateStudyEventDataOnUpdate
   * @param {object} StudyEventData object with properties {subject: string,
   * source: string, resourceName: string, link: string, image: string,
   * isConcluded: boolean, conclusionDate: Date, id: number}
   * @param {object} context object - with properties {req: express.Request,
   * res: express.Response, next: express.NextFunction}
   * @returns {boolean} isValid
   */
  validateStudyEventDataOnUpdate = async (StudyEventData, context) => {
    const linkUrlError = translate(context, "study.event.validate.link.url");
    const estimatedTimeNumberError = translate(
      context,
      "study.event.validate.estimate.time.positive"
    );
    const isConcludedBooleanError = translate(
      context,
      "study.event.validate.is.concluded"
    );
    const conclusionDateNumberError = translate(
      context,
      "study.event.validate.conclusion.date.positive"
    );
    const idNumberRequiredError = translate(
      context,
      "study.event.validate.id.required"
    );
    const idNumberPositiveError = translate(
      context,
      "study.event.validate.id.positive"
    );

    let isValid = false;

    const schema = yup.object().shape({
      subject: yup.string(),
      source: yup.string(),
      resourceName: yup.string(),
      link: yup.string().url(linkUrlError),
      image: yup.string(),
      estimatedTime: yup.number(estimatedTimeNumberError),
      isConcluded: yup.boolean(isConcludedBooleanError),
      conclusionDate: yup
        .date(conclusionDateNumberError)
        .transform((castValue, originalValue) => {
          return Number.isNaN(Number(originalValue))
            ? castValue
            : new Date(Number(originalValue));
        }),
      id: yup
        .number()
        .required(idNumberRequiredError)
        .positive(idNumberPositiveError),
    });

    await schema
      .isValid({ ...StudyEventData })
      .then((valid) => (isValid = valid));

    return isValid;
  };

   /**
   * method validateStudyEventDataOnDelete
   * @param {object} StudyEventData object with properties {id: number}
   * @param {object} context object - with properties {req: express.Request,
   * res: express.Response, next: express.NextFunction}
   * @returns {boolean} isValid
   */
  validateStudyEventDataOnDelete = async (StudyEventDataId, context) => {
    const idNumberRequiredError = translate(
      context,
      "study.event.validate.id.required"
    );
    const idNumberPositiveError = translate(
      context,
      "study.event.validate.id.positive"
    );

    let isValid = false;

    const schema = yup.object().shape({
      id: yup
        .number()
        .required(idNumberRequiredError)
        .positive(idNumberPositiveError),
    });

    await schema
      .isValid({ ...StudyEventDataId })
      .then((valid) => (isValid = valid));

    return isValid;
  };
}

module.exports.StudyEventService = new StudyEventService();
