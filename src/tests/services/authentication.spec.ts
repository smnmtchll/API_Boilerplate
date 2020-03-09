import AuthService from '../../services/auth.service';
import bcrypt from 'bcrypt';

describe('Authentication service', () => {
    describe('Comparing passwords', () => {
        it(`should return false if the supplied passwords do not match`, async done => {
            const matchingPassword = await AuthService.comparePasswords(
                'testpassword',
                'nonMatchingPassword'
            );
            expect(matchingPassword).toBe(false);
            done();
        });

        it(`should return true if the supplied passwords match`, async done => {
            const password = 'MatchingPassword';
            const hashedPassword = await bcrypt.hash(password, 10);
            const matchingPassword = await AuthService.comparePasswords(
                password,
                hashedPassword
            );
            expect(matchingPassword).toBe(true);
            done();
        });

        // it(`given a non matching email or password combination it should throw an 'Invalid login credentials' error.`, async done => {
        //     const MockFindUserByEmail = jest.spyOn(
        //         UserService,
        //         'findUserByEmail'
        //     );
        //     MockFindUserByEmail.mockReturnValueOnce(Promise.resolve(false));
        //     try {
        //         await AuthService.validateUserCreds(
        //             'test@test.com',
        //             'thisIsAPassword'
        //         );
        //     } catch (err) {
        //         expect(MockFindUserByEmail).toHaveBeenCalledWith(
        //             'test@test.com'
        //         );
        //         expect(err.message).toBe(
        //             'No user matching those credentials found'
        //         );
        //         done();
        //     }
        // });

        // it('should return a User object if the email and password find a match', async done => {
        //     const MockFindUserByEmail = jest.spyOn(
        //         UserService,
        //         'findUserByEmail'
        //     );
        //     MockFindUserByEmail.mockReturnValueOnce(
        //         Promise.resolve({
        //             id: 'cr3t4dy67i8hogu6f5y4td',
        //             email: 'test@test.com',
        //         })
        //     );
        //     // const MockComparePasswords = jest.spyOn(
        //     //     AuthService,
        //     //     'comparePasswords'
        //     // );
        //     // MockComparePasswords.mockReturnValueOnce(
        //     //     Promise.resolve(true);
        //     // )

        //     const authorisedUser = await AuthService.validateUserCreds(
        //         'test@test.com',
        //         'thisIsAPassword'
        //     );
        //     expect(MockFindUserByEmail).toHaveBeenCalledWith('test@test.com');
        //     expect(authorisedUser).toMatchObject(
        //         Promise.resolve({
        //             id: 'cr3t4dy67i8hogu6f5y4td',
        //             email: 'test@test.com',
        //         })
        //     );
        //     done();
        // });
    });
});
