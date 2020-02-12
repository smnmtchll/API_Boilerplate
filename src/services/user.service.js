const { prisma } = require('../generated/prisma-client');

// CAUTION: This returns a user object to include the password
//          (required for login). Make sure to delete the
//          password before returning to the client.
exports.findUserByEmail = async email => {
    try {
        const thisUser = await prisma.user({ email: email });
        if (!thisUser) {
            return false;
        }
        return thisUser;
    } catch (e) {
        throw Error('Error while retrieving user by email');
    }
};
