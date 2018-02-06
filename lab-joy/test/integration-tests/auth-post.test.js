'use strict';

require('jest');
const superagent = require('superagent');
// const faker = require('faker');
const Auth = require('../../model/auth');
const server = require('../../lib/server');
// const errorHandler = require('../../lib/error-handler');
const mocks = require('../lib/mocks');
const basePath = `:${process.env.PORT}/api/v1`;

describe('POST api/v1/signup', () => {
    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
    beforeAll(() => {
        return superagent.post(`${basePath}/signup`)
            .send(mocks.auth.createOne())
            .then(res => {
                console.log(res);
                this.response = res;
            });
    });
    afterAll(() => server.stop());
    afterAll(() => Promise.all([Auth.remove()]));

    it('should return status 201 for successful sign up', () => {
        // return superagent.post(`${basePath}/signup`)
        //     .send(new Auth({
        //         username: faker.internet.userName(),
        //         password: faker.internet.password(),
        //         email: faker.internet.email(),
        //     }))
        //     .then(res => expect(res.status).toBe(201))
        //     .catch(err => errorHandler(err, res));
        expect(this.response.status).toBe(201);
    });

    it('should return status 401 for invalid post request', () => {
        return superagent.post(`${basePath}/signup`)
            .catch(err => expect(err.status).toBe(401));
    });

    it('should return status 404 for invalid path', () => {
        return superagent.post(`${basePath}/cats`)
            .catch(err => expect(err.status).toBe(404));
    });
});