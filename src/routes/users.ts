import express from 'express';
const router = express.Router();
import { prisma } from '../generated/prisma-client';
import bcrypt from 'bcrypt';
import { check, validationResult, sanitizeBody } from 'express-validator';

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
router.get('/:id', async (req: express.Request, res: express.Response) => {
    // Gather the id from the request parameters
    const userId = req.params.id;
    const userWithoutPasswordFragment = `
        fragment UserWithoutPassword on User {
            id
            name
            email
        }
    `;
    // Run the query
    try {
        const user = await prisma
            .user({ id: userId })
            .$fragment(userWithoutPasswordFragment);
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
            .withMessage('You must enter a valid email.'),
        check('password')
            .isLength({ min: 8 })
            .withMessage('Passwords must be at least 8 characters long.')
            .custom((value, { req }) => {
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
    async (req: express.Request, res: express.Response) => {
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

export default router;
