'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');

const mock = module.exports = {};

mock.user = {};

mock.user.createOne = () => {

  return new Auth({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.hacker.ingverb(),
  }).save();
};

mock.user.removeAll = () => Promise.all([Auth.remove()]);
