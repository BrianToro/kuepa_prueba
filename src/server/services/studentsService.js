const MongoLib = require('../libs/mongo');

class StudentsService {
    constructor() {
        this.collection = 'students';
        this.mongoDB = new MongoLib();
    }

    async register({ studentToRegister }){
        const askForUserExist = await this.mongoDB.get(this.collection, studentToRegister.user_id);
        console.log(askForUserExist);
        if(askForUserExist){
            return null
        }
        const studentCreatedId = await this.mongoDB.create(this.collection, studentToRegister);
        return studentCreatedId;
    }

    async login({ studentToValidate }){
        const askForUserExist = await this.mongoDB.getWithPassword(this.collection, { studentToValidate });
        if(askForUserExist){
            return askForUserExist;
        }

        return null
    }
}

module.exports = StudentsService;