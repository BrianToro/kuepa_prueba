const MongoLib = require('../libs/mongo');

class StudentsService {
    constructor() {
        this.collection = 'students';
        this.mongoDB = new MongoLib();
    }
}

module.exports = StudentsService;