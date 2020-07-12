const UserRepositoryMock = require('./mocks/userRepositoryMock');
const { StudentsService } = require('../server/services');

describe('Testing of services', () => {
    describe('Student services testing', () => {
        
        const userRepo = new UserRepositoryMock();
        const studentsService = new StudentsService(userRepo);

        describe('Service of login tests', () => {
            
            test('When find the user successfully', async () => {

                const studentToValidate = {
                    user_id: "BrianToro2",
                    user_password: "12345678"
                }

                expect(typeof await studentsService.login({ studentToValidate })).toEqual('object');
            });

            test('When the user does not match the user sent', async () => {

                const studentToValidate = {
                    user_id: "BrianToro1"
                }

                expect(await studentsService.login({ studentToValidate })).toBeNull();
            });

            test('When the password does not match the password sent', async () => {

                const studentToValidate = {
                    user_id: "BrianToro2",
                    user_password: "12345"
                }

                expect(await studentsService.login({ studentToValidate })).toBeNull();
            });
        });
    });
});