'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const User = require('../../model/auth');
const faker = require('faker');
require('jest');

describe('GET /api/v1/signup', function() {
  let base = `:${process.env.PORT}/api/v1/signin`;
  let signup = `:${process.env.PORT}/api/v1/signup`;
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(() => Promise.all([User.remove()]));
  

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(signup)
        .send(new User({
          username: faker.name.firstName(),
          password: faker.name.lastName(),
          email: faker.internet.email(),
        }))
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(base)
            .auth(this.response.request._data.username, this.response.request._data.password)
            .then(res => this.test = res);
        });
    });
  });

  it('should respond with a status of 200', () => {
    expect(this.test.status).toBe(200);
  });
  it('should get a 401 if the user could not be authenticated', () => {
    return superagent.get(base)
      .auth('jogn', 'hello')
      .catch(err => {
        expect(err.status).toBe(401);
      });
  });
});

