# Welcome to my Node, Express, Prisma, MySQL Boilerplate.

This template is intended as a starting point for future applications. It sets up an API structure with basic User and Authentication routes as a platform on which to build from.

### Files are written in Typescript. Testing follows TDD principles, unit tests implented with Jest

> **DISCLAIMER:** This codebase is not complete and is not recommended for production.

> **COMING SOON:** I will be building a similar boilerplate with the initial stucture for a front end platform, using **React** and **Redux**.

> **REQUIREMENTS:** The following instructions assume you have **Node** and **Docker** installed on your local machine.

To begin, clone the repo to your desktop and run the following commands:

```terminal
$ npm install   # Install the dependencies from the package.json file
$ prisma deploy # Deploy and generate Prisma
$ npm run dev   # Start the Node server in dev mode
```

To run tests:

```javascript
$ npm test  /* Recommend setting up Jenkins to auto run tests on a pull request trigger */
```

## Public Routes

```javascript
GET '/' /* Returns a 200 status code and a json object containing 'Home' as a title attribute. */
POST '/auth/login'  /* Authenticates a user and creates a user session record */
```

## Protected Routes

```javascript
GET  '/users/:id'   /* Returns a single user based on the supplied id */
POST '/users'       /* Creates a new user */
```

## Road Map

-   Add [Redis](https://redislabs.com/) for persisting user session data
-   Add authentication middleware
