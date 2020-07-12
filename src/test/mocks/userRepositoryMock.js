class UserRepositoryMock {
    get(collection, user_id) {
        if (collection === 'students') {
            const student = {
                user_id: "BrianToro2",
                user_name: "BrianToro2",
                user_password: "$2b$05$BP0RsKGjnRMWTZCjQ9zXCeDSwMc1asUhD426iQAh45k/QMUhdp0fO"
            }
            if (user_id === student.user_id ) return student
            else return null
        } else if (collection === 'teachers'){
            const teacher = {
                user_id: "Moderador",
                user_name: "Profesor",
                user_password: "$2b$05$q9pk6R1DtSRNEF.60Oegfu6MJvTbxSEkWvI43b6YFPu8CJ50EQ5iG"
            }
            if (user_id === teacher.user_id ) return teacher
            else return null
        }
        return null;
    }
}

module.exports = UserRepositoryMock;
