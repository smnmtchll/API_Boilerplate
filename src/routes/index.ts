import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    res.status(200).send({ title: 'Home' });
});

module.exports = router;
