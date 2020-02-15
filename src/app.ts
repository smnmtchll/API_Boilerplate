import express from 'express';
interface Error {
    status?: number;
    message?: string;
}
import bodyParser from 'body-parser';
import winston from './winston';

const app = express();

app.listen(3000, () =>
    // tslint:disable-next-line:no-console
    winston.info('Server is running on http://localhost:3000')
);

app.use(bodyParser.json());

// Log request activity with Winston
app.use((req: express.Request, res: express.Response, done) => {
    winston.info(req.originalUrl);
    done();
});

import indexRouter from './routes/index';
import authenticationRouter from './routes/authentication';
import usersRouter from './routes/users';

app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/users', usersRouter);

// Catch 404
app.use(function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const err = {
        status: 404,
        message: 'Not found',
    };
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
        if (res.headersSent) {
            return next(err);
        }
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        winston.error(
            `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
                req.method
            } - ${req.ip}`
        );

        // Return the error
        res.sendStatus(err.status || 500);
    }
);

export default app;
