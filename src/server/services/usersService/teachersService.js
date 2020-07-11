const MongoLib = require('../../libs/mongo');
const bcrypt = require('bcrypt');

class TeachersService {
    constructor(usersRepository = new MongoLib()) {
        this.collection = 'teachers';
        this.mongoDB = usersRepository;
    }

    async register({ teacherToRegister }){
        const askForUserExist = await this.mongoDB.get(this.collection, teacherToRegister.user_id);
        if(askForUserExist){
            return null
        }
        let teacher = {
            user_id: teacherToRegister.user_id,
            user_name: teacherToRegister.user_name,
            user_password: (await this.encryptPassword(teacherToRegister.user_password)).toString(),
        }
        const teacherCreatedId = await this.mongoDB.create(this.collection, teacher);
        return teacherCreatedId;
    }

    async login({ teacherToValidate }){
        const askForUserExist = await this.mongoDB.get(this.collection, teacherToValidate.user_id);
        if(askForUserExist){
            const passwordValidate = await this.validatePassword(teacherToValidate.user_password, askForUserExist.user_password);
            if(passwordValidate){
                return askForUserExist;    
            }
            return null
        }
        return null
    }

    async validatePassword(user_password, hashedPassword){
        return bcrypt.compare(user_password, hashedPassword);
    }

    async encryptPassword(user_password){
        const hashedPassword = await bcrypt.hash(user_password, 5);
        return hashedPassword
    }
}

module.exports = TeachersService;