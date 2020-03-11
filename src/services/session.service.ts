import { prisma } from '../generated/prisma-client';

const findSession = async (userId: string) => {
    const query = `
        query {
            sessions(
                where: {
                    user: {
                        id: "${userId}"
                    }
                }
            ), {
                id
                updatedAt
            }
        }
    `;
    const sessionResponse = await prisma.$graphql(query);
    return sessionResponse.sessions[0] ? sessionResponse.sessions[0] : false;
};

const createNewSession = async (userId: string) => {
    if (!userId) {
        throw new Error('A User ID must be supplied to create a Session');
    }
    const newSession = await prisma.createSession({
        user: {
            connect: { id: userId },
        },
    });
    if (!newSession) {
        throw new Error('There was a problem creating a new user session');
    }
    return true;
};

const updateExistingSession = async (sessionId: string) => {
    if (!sessionId) {
        throw new Error('A Session ID must be supplied to update a Session');
    }
    const updatedSession = await prisma.updateSession({
        data: {
            dummy: 'refreshed', // update the dummy field to force updatedAt to change
        },
        where: {
            id: sessionId,
        },
    });
    if (!updatedSession) {
        throw new Error('There was a problem updating the user session');
    }
    return true;
};

const upsertUserSession = async (userId: string) => {
    // Check if a session already exists
    const sessionExists = await findSession(userId);
    if (!sessionExists) {
        // Create a new session here
        const newSession = await createNewSession(userId);
        return newSession ? true : false;
    } else {
        // Update the existing session
        const updatedSession = await updateExistingSession(
            sessionExists.sessions[0].id
        );
        return updatedSession ? true : false;
    }
};

const deleteSession = async (sessionId: string) => {
    await prisma.deleteSession({
        id: sessionId,
    });
};

export default {
    upsertUserSession,
    findSession,
    createNewSession,
    updateExistingSession,
    deleteSession,
};
