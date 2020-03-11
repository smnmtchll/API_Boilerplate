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

///////////////// --> AUTHENTICATION
describe('Authenticate for login', () => {
    it('should throw a 401 if an email is not supplied', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: '',
                password: 'thisIsAPassword',
            })
            .expect(401);
    });

    it('should throw a 401 if a password is not supplied', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.com',
                password: '',
            })
            .expect(401);
    });

    it('should throw a 401 if a valid email and password are not supplied', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test123.com',
                password: 'notAValidPassword',
            })
            .expect(401);
    });
});
