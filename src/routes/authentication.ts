import express from 'express';
const router = express.Router();
import winston from '../winston';
import AuthService from '../services/auth.service';
import SessionService from '../services/session.service';
import UserService from '../services/user.service';

/* POST login credentials */
router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        // Define the incoming constants
        const email = req.body.email;
        const password = req.body.password;
        // Make sure an email and password were supplied
        if (!email || !password) {
            winston.info({
                message: `Error: Routes.Authentication.Login - Someone tried to login without providing an email and password`,
            });
            res.status(401);
            throw new Error('An email and password are required');
        }
        // Find the user
        const existingUser = await UserService.findUserByEmail(email);
        // Check the password matches if a user is found
        if (existingUser) {
            await AuthService.comparePasswords(
                password,
                existingUser.password!
            );
            delete existingUser.password;
            // Create a new user session
            await SessionService.upsertUserSession(existingUser.id);
            if (!SessionService) {
                throw new Error('There was a problem with the user session');
            }
            // Return the user details
            res.json(existingUser);
        }
    } catch (err) {
        winston.error({
            message: `Error: Routes.Authentication - ${err.message}`,
        });
        res.sendStatus(401);
    }
});

export default router;
