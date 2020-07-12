const UserRepositoryMock = require('./mocks/userRepositoryMock');
const { TeachersService } = require('../server/services');

describe('Testing of services', () => {
    describe('Teachers services testing', () => {
        
        const userRepo = new UserRepositoryMock();
        const teachersService = new TeachersService(userRepo);

        describe('Service of login tests', () => {
            
            test('When find the user successfully', async () => {

                const teacherToValidate = {
                    user_id: "Moderador",
                    user_password: "12345678"
                }

                expect(typeof await teachersService.login({ teacherToValidate })).toEqual('object');
            });

            test('When the user does not match the user sent', async () => {

                const teacherToValidate = {
                    user_id: "Moderador2"
                }

                expect(await teachersService.login({ teacherToValidate })).toBeNull();
            });

            test('When the password does not match the password sent', async () => {

                const teacherToValidate = {
                    user_id: "Moderador",
                    user_password: "12345"
                }

                expect(await teachersService.login({ teacherToValidate })).toBeNull();
            });
        });
    });
});