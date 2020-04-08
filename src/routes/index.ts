import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    res.status(403).send({ error: 'You must log in.' });
});

export default router;
