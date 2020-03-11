import bcrypt from 'bcrypt';
import winston from '../winston';

// Compare a submitted password with the stored and encryted password
const comparePasswords = async (
    testPassword: string,
    storedPassword: string
) => {
    try {
        const matchPassword = await bcrypt.compare(
            testPassword,
            storedPassword
        );
        const hashedPassword = await bcrypt.hash(storedPassword, 10);
        return matchPassword ? true : false;
    } catch (err) {
        winston.error({
            message: 'Error: Services.Auth.comparePasswords',
            error: err,
        });
        throw new Error('An error occurred whilst comparing passwords');
    }
};

export default {
    comparePasswords,
};
