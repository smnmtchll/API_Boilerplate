import { prisma } from '../generated/prisma-client';
import winston from '../winston';

// CAUTION: This returns a user object to include the password
//          (required for login). Make sure to delete the
//          password before returning to the client.
exports.findUserByEmail = async (email: string) => {
    try {
        const thisUser = await prisma.user({ email: email });
        return thisUser ? thisUser : false;
    } catch (err) {
        winston.error({
            message: 'Error: Services.User.findUserByEmail',
            error: err,
        });
    }
};
