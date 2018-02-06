'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const Auth = require('../../model/auth');
const faker = require('faker');
require('jest');

describe('POST /api/v1/signup', function() {
  let basePath = `:${process.env.PORT}/api/v1/signup`;
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(() => Promise.all([Auth.remove()]));

  describe('valid request and response', () => {
    beforeAll(() => {
      return superagent.post(basePath)
        .send(new Auth({
          username: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.hacker.ingverb(),
        }))
        .then(res => this.response = res);
    });
  });
  it('should respond with a status of 201 for a successful post', () => {
    expect(this.response.status).toBe(201);
  });
  it('should be a post with a username, password and email', () => {
    expect(this.response.request._data).toHaveProperty('username');
    expect(this.response.request._data).toHaveProperty('password');
    expect(this.response.request._data).toHaveProperty('email');
  });

  describe('Invalid request', () => {
    it('should return a status 404 for a bad path', () => {
      return superagent.post(':3000/api/v1/doesNotExist')
        .send(new Auth({
          username: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.hacker.ingverb(),
        }))
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return a status 400 for a bad request body')
      .send(new Auth({
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: '',
      }))
      .catch(err => expect(err.status).toBe(400));
  });
});
