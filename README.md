# Welcome to my Node, Express, MySQL Boilerplate.

This template is intended as a starting point for future applications. It sets up an api structure on which to build from.

Before running the server you will need to create two databases. One for running tests on and one for interacting with the running application. Both databases can be created using the createDB.sql file in the root directory (to be created as yet!!).

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
```

## Creating a new user

To create a new user you must pass an alphanumeric username no shorter than 4 characters long and a valid email address. For example:

```javascript
POST Request -> 'http://api.mydomain/api/users?username=barry&email_address=barry@manilow.com'
```

## Road Map
- Create the sql file for setting up the required databases
- Implement Prisma and GraphQL
- Create test db seeding file (testSeeding.sql) and run in beforeAll tests script.
- Configure Body-Parser to accept json objects
- Implement a robust authentication with JWT and an api key