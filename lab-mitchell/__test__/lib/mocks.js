'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const debug = require('debug')('http:mock');

const mock = module.exports = {};

// different mocks
mock.auth = {};

mock.auth.createOne = () => {
  let result = {};
  result.password = faker.name.lastName();

  debug('about to create a new mock.auth');
  return new Auth({
    username: faker.name.firstName(),
    email: faker.internet.email(),
  })
    .generatePasswordHash(result.password)
    .then(auth => result.auth = auth)
    .then(auth => auth.generateToken())
    .then(token => result.token = token)
    .then(() => {
      debug(`mock createOne result: ${result}`);
      debug(`mock createOne result.auth: ${result.auth}`);
      debug(`mock createOne result.token: ${result.token}`);
      return result;
    });
};

mock.auth.removeAll = () => Promise.all([Auth.remove()]);