import bcrypt from 'bcrypt';
import { prisma } from '../generated/prisma-client';

exports.upsertUserSession = async (userId: string) => {
    try {
        const newSession = await prisma.createSession({
            user: {
                connect: { id: userId },
            },
        });
        return newSession ? true : false;
    } catch (e) {
        throw Error('Error while upserting new user session');
    }
};

exports.comparePasswords = async (
    testPassword: string,
    storedPassword: string
) => {
    try {
        const matchPassword = bcrypt.compare(testPassword, storedPassword);
        return matchPassword ? true : false;
    } catch (e) {
        throw Error('Error while upserting new user session');
    }
};
