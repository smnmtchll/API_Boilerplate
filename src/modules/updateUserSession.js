const { prisma } = require('../generated/prisma-client');

updateUserSession = async userId => {
    const newSession = await prisma.createSession({
        user: {
            connect: { id: userId },
        },
    });
    return newSession ? true : false;
};

module.exports = updateUserSession;
