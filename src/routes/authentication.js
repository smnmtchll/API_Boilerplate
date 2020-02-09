const express = require('express');
const router = express.Router();
const { prisma } = require('../generated/prisma-client');
const bcrypt = require('bcrypt');
const updateUserSession = require('../modules/updateUserSession');

const { check, validationResult, sanitizeBody } = require('express-validator');

/* POST login credentials */
router.post('/login', async (req, res) => {
    try {
        const thisUser = await prisma.user({ email: req.body.email }); // Gather user permissions here
        if (!thisUser) {
            throw new Error('No user exists with that email address');
        } else {
            const matchPassword = await bcrypt.compare(
                req.body.password,
                thisUser.password
            );
            if (matchPassword) {
                const session = updateUserSession(thisUser.id);
                if (!session) {
                    return res.status(500);
                }
                thisUser.password = null;
                res.json(thisUser);
            } else {
                throw new Error('The password is incorrect');
            }
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
