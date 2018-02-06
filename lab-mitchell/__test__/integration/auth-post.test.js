'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mocks');
const faker = require('faker');
const errorHandler = require('../../lib/error-handler');
require('jest');

describe('#auth-post /api/v1/signup', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/signup`);
  beforeAll(server.start);
  afterAll(server.stop);
  // afterEach(mock.auth.removeAll);

  describe('valid input/output', () => {
    // beforeAll(() => {
    //   return mock.auth.createOne()
    //     .then(auth => this.mockAuth = auth)
    //     .then(() => {
    //       this.mockAuth = {
    //         username: faker.name.firstName(),
    //         password: faker.name.lastName(),
    //         email: faker.internet.email(),
    //       };

    //       return superagent.post(`${this.base}`)
    //         .send(this.mockAuth)
    //         .then(res => this.response = res)
    //         .catch(err => errorHandler(err));
    //     });
    // });

    beforeAll(() => {
      return superagent.post(`${this.base}`)
        .send({username: 'lolita', password: 'jones', email: 'email@yahoo.com'})
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });
    
    it('should return a response status of 201', () => {
      // console.log('mockauth:',this.mockAuth);
      console.log('this.reponse.body:', this.response);
      expect(this.response.status).toBe(201);
    });
  });



  describe('invalid input/output', () => {

  });
});