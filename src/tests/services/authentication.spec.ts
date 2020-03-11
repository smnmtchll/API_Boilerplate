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
    });
});
