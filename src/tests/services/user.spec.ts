import UserService from '../../services/user.service';
import { prisma } from '../../generated/prisma-client';

describe('User service', () => {
    describe('Retrieving a user with a supplied email address', () => {
        it(`should return false if the supplied email does not match a record in the database`, async done => {
            const user = await UserService.findUserByEmail(
                'notValid@email.com'
            );
            expect(user).toBe(false);
            done();
        });

        it(`should return a user object if the email matches a record in the database`, async done => {
            const numUsers = await prisma
                .usersConnection()
                .aggregate()
                .count();
            let num = Math.floor(Math.random() * numUsers + 1);
            if (num > 1) {
                num = num - 1;
            }
            const randUser = await prisma.users({
                first: 1,
                skip: num,
            });
            const user = await UserService.findUserByEmail(randUser[0].email);
            expect(user).toMatchObject(randUser[0]);
            done();
        });
    });
});
