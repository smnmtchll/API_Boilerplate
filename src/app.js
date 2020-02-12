const express = require('express');
const bodyParser = require('body-parser');
const { prisma } = require('./generated/prisma-client');
const logger = require('morgan');

const app = express();

app.listen(3000, () =>
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
app.use(function(req, res, next) {
    next(res.sendStatus(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Return the error
    res.status(err.status || 500);
    res.sendStatus(500);
});

module.exports = app;
