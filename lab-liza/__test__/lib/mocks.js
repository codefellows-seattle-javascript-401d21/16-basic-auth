'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');

const mock = module.exports = {};

// auth Mocks - One, Many, RemoveAll
mock.auth = {};

// mock.auth.createOne = () => new Auth({ name: faker.hacker.adjective() }).save();
mock.auth.createOne = () => {
  let result = {};

  return new Auth({
    username: `${faker.hacker.adjective()}`,
  })
    .then(auth => result.auth = auth)
    .then(() => result);
};

mock.auth.removeAll = () => Promise.all([Auth.remove()]);