const express = require('express');
const router = express.Router();
const { prisma } = require('../generated/prisma-client');
const bcrypt = require('bcrypt');

const { check, validationResult, sanitizeBody } = require('express-validator');

/* GET all users */
// router.get('/', async (req, res) => {
//     // const allUsers = await prisma.users();
//     const fragment = `
//         fragment UsersWithoutPassword on User {
//             id
//             name
//             email
//         }
//     `;
//     const UsersWithoutPassword = await prisma.users().$fragment(fragment);
//     res.json(UsersWithoutPassword);
// });

/* GET a user */
router.get('/:id', async (req, res) => {
    // Gather the id from the request parameters
    const userId = req.params.id;
    const fragment = `
        fragment UserWithoutPassword on User {
            id
            name
            email
        }
    `;
    // Run the query
    try {
        const user = await prisma.user({ id: userId }).$fragment(fragment);
        if (!user) {
            res.sendStatus(404);
        }
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

/* POST a new user */
router.post(
    '/',
    [
        check('name')
            .isLength({ min: 4 })
            .withMessage(
                `A minimum of 4 characters is required for the 'name' field.`
            )
            .isAlpha()
            .withMessage('Your name must contain only letters.')
            .trim()
            .escape(),
        check('email')
            .isEmail()
            .withMessage('You must enter a valid email.')
            .normalizeEmail({ lowercase: true }),
        check('password')
            .isLength({ min: 8 })
            .withMessage('Passwords must be at least 8 characters long.')
            .custom((value, { req, loc, path }) => {
                if (value !== req.body.confirmPassword) {
                    // Throw error if passwords do not match
                    throw new Error('Passwords do not match');
                } else {
                    return value;
                }
            })
            .trim()
            .escape(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name.toLowerCase(),
            email: req.body.email,
            password: hashedPassword,
        };
        try {
            const createdUser = await prisma.createUser(newUser);
            res.json(createdUser);
        } catch (error) {
            res.json(error);
        }
    }
);

module.exports = router;
