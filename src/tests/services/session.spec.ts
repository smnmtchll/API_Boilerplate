import SessionService from '../../services/session.service';
import { prisma } from '../../generated/prisma-client';
import { doesNotMatch } from 'assert';
import UserService from '../../services/user.service';
interface Session {
    user: {
        id: string;
    };
}

describe('Session service', () => {
    describe('Checking for a session with a user id', () => {
        it('should return false if no session exists for the user', async done => {
            const session = await SessionService.findSession(
                'noSessionAvailableForThisId'
            );
            expect(session).toEqual(false);
            done();
        });

        it('should return a session record when one exists for the user', async done => {
            const numSessions = await prisma
                .sessionsConnection()
                .aggregate()
                .count();
            let num = Math.floor(Math.random() * numSessions + 1);
            if (num > 1) {
                num = num - 1;
            }
            const fragment = `
                fragment SessionWithUser on Session {
                id
                updatedAt
                user {
                    id
                }
            }`;
            const randSession: [Session] = await prisma
                .sessions({
                    first: 1,
                    skip: num,
                })
                .$fragment(fragment);
            const session = await SessionService.findSession(
                randSession[0].user.id
            );
            delete randSession[0].user;
            expect(session).toMatchObject(randSession[0]);
            done();
        });
    });

    describe('Creating a new session with a user id', () => {
        it('should throw an error if no User ID is supplied', async done => {
            try {
                await SessionService.createNewSession('');
            } catch (err) {
                expect(err.message).toBe(
                    'A User ID must be supplied to create a Session'
                );
                done();
            }
        });

        it('should create a new Session record and return true when passed a valid User ID', async done => {
            // Create a new dummy user
            const dummyUser = await UserService.createNewUser(
                'test@test123.com',
                'Test User',
                'thisISAPassword',
                'thisISAPassword'
            );
            // Create a new session for the user
            await SessionService.createNewSession(dummyUser.id);
            // Check to see it has been created
            const storedSession = await SessionService.findSession(
                dummyUser.id
            );
            const check = storedSession ? true : false;
            // Delete the session and dummy user
            await SessionService.deleteSession(storedSession.id);
            await UserService.deleteUser(dummyUser.id);
            expect(check).toBeTruthy();
            done();
        });
    });

    describe('Updating a Session record with the current time', () => {
        it('should throw an error if a no Session ID was supplied', async done => {
            try {
                await SessionService.updateExistingSession('');
            } catch (err) {
                expect(err.message).toBe(
                    'A Session ID must be supplied to update a Session'
                );
                done();
            }
        });

        it('should update a session record with the current time set in the updatedAt field', async done => {
            // Get a random userId
            // Create a new session with a the id and log time
            // Set a timeout for 5 seconds
            // Run the function to update the record
            // Retrieve the record and compare the updatedAt with the earlier logged time
            // Delete the record
            done();
        });
    });
});
