"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var app = express_1.default();
app.listen(3000, function () {
    // tslint:disable-next-line:no-console
    return console.log('Server is running on http://localhost:3000');
});
app.use(body_parser_1.default.json());
app.use(morgan_1.default('dev'));
var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/authentication');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/users', usersRouter);
// Catch 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status(404);
    next(err);
});
// Error handler
app.use(function (err, req, res, next) {
    res.sendStatus(err.status || 500);
});
exports.default = app;
