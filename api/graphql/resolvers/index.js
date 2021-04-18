const { helloController } = require('../../controllers/hello/HelloController');
const { createUser, login, updateUser } = require('../../controllers/user/UserController');
const { createStudyEvent, updateStudyEvent, deleteStudyEvent, getAllStudyEvents } = require('../../controllers/study/StudyEventController');

module.exports.rootResolvers = {
    helloController,
    createUser,
    login,
    updateUser,
    createStudyEvent,
    updateStudyEvent,
    deleteStudyEvent,
    getAllStudyEvents    
}