const MongoLib = require('../../libs/mongo');

class TeachersService {
    constructor() {
        this.collection = 'teachers';
        this.mongoDB = new MongoLib();
    }
}

module.exports = TeachersService;