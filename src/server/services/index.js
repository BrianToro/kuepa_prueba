const StudentsService = require('./usersService/studentsService');
const TeachersService = require('./usersService/teachersService');
const { addUser, getUser, removeUser } = require('./chatService/chatService');

module.exports = {
    StudentsService,
    TeachersService,
    addUser,
    getUser,
    removeUser
}