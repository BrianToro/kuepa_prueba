const MongoLib = require('../../libs/mongo');

class ChatService {

    constructor(usersRepository = new MongoLib()) {
        this.collection = 'messages';
        this.mongoDB = usersRepository;
    }

    async saveMessage({ messageToSend }) {
        const idMessage = await this.mongoDB.create(this.collection, messageToSend);
        if(idMessage){
            return true
        } else {
            return false
        }
    }
}

module.exports = ChatService;