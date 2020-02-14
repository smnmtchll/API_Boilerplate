import express from 'express';
interface Error {
    status?: number;
    message?: string;
}
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();

app.listen(3000, () =>
    // tslint:disable-next-line:no-console
    console.log('Server is running on http://localhost:3000')
);

app.use(bodyParser.json());
app.use(logger('dev'));

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/users', usersRouter);

// Catch 404
app.use(function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const err = new Error('Not Found');
    res.status(404);
    next(err);
});

// Error handler
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.sendStatus(err.status || 500);
    }
);

export default app;
