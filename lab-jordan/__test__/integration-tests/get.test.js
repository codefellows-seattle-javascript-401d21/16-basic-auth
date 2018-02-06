'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
const Auth = require('../../model/auth');
const faker = require('faker');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/signin`;
let api2 = `:${port}/api/v1/signup`;

describe('GET /api/v1/signup', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(() => Promise.all([Auth.remove()]));

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(api2)
        .send(new Auth({
          username: faker.name.firstName(),
          password: faker.name.lastName(),
          email: faker.internet.email(),
        }))
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(api)
            .auth(this.response.request._data.username, this.response.request._data.password)
            .then(res => this.test = res);
        });
    });
  });

  it('should respond with a status of 200', () => {
    expect(this.test.status).toBe(200);
  });
  it('should get a 401 if the user could not be authenticated', () => {
    return superagent.get(api)
      .auth('foo', 'bar')
      .catch(err => {
        expect(err.status).toBe(401);
      });
  });
});
