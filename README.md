# Welcome to my Node, Express, Prisma, MySQL Boilerplate.

This template is intended as a starting point for future applications. It sets up an api structure on which to build from.

Before running the server you will need to deploy and generate the Docker containers for Prisma and MySQL.

```shell
# From inside ./api/prisma
$ prisma deploy
$ prisma generate
```

To run tests from the api directrory run:

```terminal
npm install
npm test
```

To start the server, cd into the api directory and run:

```terminal
npm install
npm start
```

## Routes

```javascript
GET '/' /* Returns a 200 status code and a json object containing 'Home' as a title attribute. */
```

```javascript
GET  'api/users'        /* Returns an array of all users */
GET  'api/users/:id'    /* Returns a single user based on the supplied id */
POST 'api/users'        /* Creates a new user — See below for further instructions */
POST 'api/users/login'  /* Authenticates a user and returns a JWT token (yet to be built) */
```

## Creating a new user

To create a new user you must pass an alphanumeric username no shorter than 4 characters long and a valid email address. For example:

```javascript
POST Request -> 'http://api.mydomain/api/users?username=barry&email_address=barry@manilow.com'
```

## Road Map

- Add authentication