const StudentsService = require('./usersService/studentsService');
const TeachersService = require('./usersService/teachersService');
const ChatService = require('./chatService/chatService');
const { addUser, getUser, removeUser } = require('./roomService/roomService');

module.exports = {
    StudentsService,
    TeachersService,
    addUser,
    getUser,
    removeUser,
    ChatService
}