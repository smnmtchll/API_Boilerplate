import { prisma } from '../generated/prisma-client';
import winston from '../winston';
import bcrypt from 'bcrypt';
import auth from './auth.service';

// CAUTION: This returns a user object to include the password
//          (required for authentication). Make sure to delete the
//          password before returning to the client.
const findUserByEmail = async (email: string) => {
    try {
        const thisUser = await prisma.user({ email: email });
        return thisUser ? thisUser : false;
    } catch (err) {
        winston.error({
            message: 'Error: Services.User.findUserByEmail',
            error: err,
        });
        throw new Error(
            `An error occurred whilst trying to retrieve a user with an email`
        );
    }
};

// THIS FUNCTION NEEDS A LOT MORE WORK!!!!!!!!
const createNewUser = async (
    email: string,
    name: string,
    password: string,
    confirmPassword: string
) => {
    try {
        await bcrypt.compare(password, confirmPassword);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.createUser({
            email: email,
            password: hashedPassword,
            name: name,
        });
        return newUser;
    } catch (err) {
        winston.error({
            message: 'Error: Services.Auth.comparePasswords',
            error: err,
        });
        throw new Error('An error occurred whilst creating a new user');
    }
};

const deleteUser = async (userId: string) => {
    await prisma.deleteUser({
        id: userId,
    });
};

export default {
    findUserByEmail,
    createNewUser,
    deleteUser,
};
