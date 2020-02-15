import bcrypt from 'bcrypt';
import { prisma } from '../generated/prisma-client';
import winston from '../winston';

exports.upsertUserSession = async (userId: string) => {
    try {
        const newSession = await prisma.createSession({
            user: {
                connect: { id: userId },
            },
        });
        return newSession ? true : false;
    } catch (err) {
        winston.error({
            message: 'Error: Services.Auth.upsertUserSession',
            error: err,
        });
    }
};

exports.comparePasswords = async (
    testPassword: string,
    storedPassword: string
) => {
    try {
        const matchPassword = bcrypt.compare(testPassword, storedPassword);
        return matchPassword ? true : false;
    } catch (err) {
        winston.error({
            message: 'Error: Services.Auth.comparePasswords',
            error: err,
        });
    }
};
