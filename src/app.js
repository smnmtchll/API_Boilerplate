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

// app.post(`/user`, async (req, res) => {
//     const user = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//     };
//     // req.body.password = await bcrypt.hash(args.password, 10)
//     const result = await prisma.createUser({
//         ...user,
//     });
//     res.json(result);
// });

// app.post(`/post`, async (req, res) => {
//     const { title, content, authorEmail } = req.body;
//     const result = await prisma.createPost({
//         title: title,
//         content: content,
//         author: { connect: { email: authorEmail } },
//     });
//     res.json(result);
// });

// app.put('/publish/:id', async (req, res) => {
//     const { id } = req.params;
//     const post = await prisma.updatePost({
//         where: { id },
//         data: { published: true },
//     });
//     res.json(post);
// });

// app.delete(`/post/:id`, async (req, res) => {
//     const { id } = req.params;
//     const post = await prisma.deletePost({ id });
//     res.json(post);
// });

// app.get(`/post/:id`, async (req, res) => {
//     const { id } = req.params;
//     const post = await prisma.post({ id });
//     res.json(post);
// });

// app.get('/feed', async (req, res) => {
//     const posts = await prisma.posts({ where: { published: true } });
//     res.json(posts);
// });

// app.get('/filterPosts', async (req, res) => {
//     const { searchString } = req.query;
//     const draftPosts = await prisma.posts({
//         where: {
//             OR: [
//                 {
//                     title_contains: searchString,
//                 },
//                 {
//                     content_contains: searchString,
//                 },
//             ],
//         },
//     });
//     res.json(draftPosts);
// });
