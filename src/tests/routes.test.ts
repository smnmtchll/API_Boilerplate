import request from 'supertest';
import app from '../app';

//////////////// --> HOME PAGE AND 404 CHECKS
describe('Using the home page to check the app is up and running', () => {
    it('should return a status 200 code', async () => {
        const res = await request(app)
            .get('/')
            .expect(200);
    });
});

describe('Testing the 404 response', () => {
    it('should return a status 404 code', async () => {
        const res = await request(app)
            .get('/nothing_to_see_here')
            .expect(404);
    });
});

//////////////// --> USER ROUTES
describe('Get a user by id', () => {
    it('should retrieve one user (username and email) and return the user as a json object', async () => {
        const res = await request(app)
            .get('/api/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                username: 'Peter',
                email_address: 'peter@peter.com',
            });
    });

    it('should fail if the user id sent is not a number', async () => {
        const res = await request(app)
            .get('/api/users/test')
            .expect(400);
    });
});

describe('Get all users', () => {
    it('should return all users as an array of json objects', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [
                {
                    username: 'Peter',
                    email_address: 'peter@peter.com',
                },
                {
                    username: 'Sarah',
                    email_address: 'sarah@sarah.com',
                },
                {
                    username: 'Claudia',
                    email_address: 'claudia@claudia.com',
                },
                {
                    username: 'Katie',
                    email_address: 'katie@katie.com',
                },
            ]);
    });
});

describe('Create a new user', () => {
    it('should return a 201 code', async () => {
        const res = await request(app)
            .post('/api/users')
            .send('username=john&email_address=john@myemail.com')
            .expect(201);
    });

    it('should fail if the email is not valid', async () => {
        const res = await request(app)
            .post('/api/users')
            .send('username=john&email_address=johnATmyemail.com')
            .expect(422);
    });

    it('should fail if the username is not alphanumeric', async () => {
        const res = await request(app)
            .post('/api/users')
            .send('username=john-smith&email_address=john@myemail.com')
            .expect(422);
    });

    it('should fail if the username is less than 4 chars long', async () => {
        const res = await request(app)
            .post('/api/users')
            .send('username=jon&email_address=john@myemail.com')
            .expect(422);
    });
});
