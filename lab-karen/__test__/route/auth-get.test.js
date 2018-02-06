'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const Auth = require('../../model/auth');
const faker = require('faker');
require('jest');

describe('GET /api/v1/signin', function() {
  let basePath = `:${process.env.PORT}/api/v1/signin`;
  let postPath = `${process.env.PORT}/api/v1/signup`;
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(() => Promise.all([Auth.remove()]));

  describe('valid request and response', () => {
    beforeAll(() => {
      return superagent.post(postPath)
        .send(new Auth({
          username: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.hacker.ingverb(),
        }))
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(basePath)
            .auth(this.response.request._data.username, this.response.request._data.username)
            .then(res => this.test = res);
        });
    });
  });
  it('should respond with a status of 200 for a successful post', () => {
    expect(this.test.status).toBe(200);
  });
  it('should return a status 401 if the user could not authenticated', () => {
    return superagent.get(basePath)
      .auth('karen', 'password')
      .catch(err => {
        expect(err.status).toBe(401);
      });
  });
});
