const bcrypt = require('bcrypt');
const { prisma } = require('../generated/prisma-client');

exports.upsertUserSession = async userId => {
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

exports.comparePasswords = async (testPassword, storedPassword) => {
    try {
        const matchPassword = bcrypt.compare(testPassword, storedPassword);
        return matchPassword ? true : false;
    } catch (e) {
        throw Error('Error while upserting new user session');
    }
};
