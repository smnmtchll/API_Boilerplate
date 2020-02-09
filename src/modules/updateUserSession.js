const { prisma } = require('../generated/prisma-client');

updateUserSession = async userId => {
    const newSession = await prisma.createSession({
        user: {
            connect: { id: userId },
        },
    });
    if (!newSession) {
        return false;
    }
    return true;
};

module.exports = updateUserSession;
