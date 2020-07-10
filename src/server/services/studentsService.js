const MongoLib = require('../libs/mongo');
const bcrypt = require('bcrypt');

class StudentsService {
    constructor() {
        this.collection = 'students';
        this.mongoDB = new MongoLib();
    }

    async register({ studentToRegister }){
        const askForUserExist = await this.mongoDB.get(this.collection, studentToRegister.user_id);
        if(askForUserExist){
            return null
        }
        let student = {
            user_id: studentToRegister.user_id,
            user_name: studentToRegister.user_name,
            user_password: (await this.encryptPassword(studentToRegister.user_password)).toString(),
        }
        const studentCreatedId = await this.mongoDB.create(this.collection, student);
        return studentCreatedId;
    }

    async login({ studentToValidate }){
        const askForUserExist = await this.mongoDB.getWithPassword(this.collection, studentToValidate.user_id);
        if(askForUserExist){
            const passwordValidate = await this.validatePassword(studentToValidate.user_password, askForUserExist.user_password);
            console.log(passwordValidate);
            if(passwordValidate){
                return askForUserExist;    
            }
            return null
        }
        return null
    }

    async validatePassword(user_password, hashedPassword){
        console.log(user_password);
        console.log(hashedPassword);
        return bcrypt.compare(user_password, hashedPassword);
    }

    async encryptPassword(user_password){
        const hashedPassword = await bcrypt.hash(user_password, 5);
        return hashedPassword
    }
}

module.exports = StudentsService;