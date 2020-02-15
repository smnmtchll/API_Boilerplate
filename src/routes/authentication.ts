import express from 'express';
const router = express.Router();
const authService = require('../services/auth.service');
const userService = require('../services/user.service');
import winston from '../winston';

/* POST login credentials */
router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        // Retrieve the user
        const thisUser = await userService.findUserByEmail(req.body.email);
        if (!thisUser) {
            winston.warn('Error: Routes.Authentication.findUserByEmail');
        }

        // Check the password matches
        const matchPassword = await authService.comparePasswords(
            req.body.password,
            thisUser.password
        );
        if (!matchPassword) {
            winston.warn('Error: Routes.Authentication.comparePasswords');
        }

        // Delete the password from the object so it is not returned to the client
        delete thisUser.password;

        // Create a new user session
        const session = await authService.upsertUserSession(thisUser.id);
        if (!session) {
            winston.warn('Error: New user session not created');
            return res.status(500);
        }

        // Return the user details
        res.json(thisUser);
    } catch (err) {
        winston.error({
            message: 'Error: Routes.Authentication',
            error: err,
        });
        res.sendStatus(err.status || 500);
    }
});

export default router;
