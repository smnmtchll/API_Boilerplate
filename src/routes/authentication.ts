import express from 'express';
const router = express.Router();
const authService = require('../services/auth.service');
const userService = require('../services/user.service');

/* POST login credentials */
router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        // Retrieve the user
        const thisUser = await userService.findUserByEmail(req.body.email);
        if (!thisUser) {
            throw new Error('No user exists with that email address');
        }

        // Check the password matches
        const matchPassword = await authService.comparePasswords(
            req.body.password,
            thisUser.password
        );
        if (!matchPassword) {
            throw new Error('The password is incorrect');
        }

        // Delete the password from the object so it is not returned to the client
        delete thisUser.password;

        // Create a new user session
        const session = await authService.upsertUserSession(thisUser.id);
        if (!session) {
            return res.status(500);
        }

        // Return the user details
        res.json(thisUser);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
