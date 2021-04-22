const { 
    helloController 
} = require("../../controllers/hello/HelloController");

const {
  createUser,
  login,
  updateUser,
  deleteUser
} = require("../../controllers/user/UserController");

const {
  createStudyEvent,
  updateStudyEvent,
  deleteStudyEvent,
  getAllStudyEvents,
  getStudyEventById,
} = require("../../controllers/study/StudyEventController");

/**
 * condenses all the functions of the controllers in one resolver
 */
module.exports.rootResolvers = {
  helloController,
  createUser,
  login,
  updateUser,
  deleteUser,
  createStudyEvent,
  updateStudyEvent,
  deleteStudyEvent,
  getAllStudyEvents,
  getStudyEventById,
};
