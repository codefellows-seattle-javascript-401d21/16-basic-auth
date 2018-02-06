'use strict';

const faker = require('faker');
const User = require('../../model/auth');


const mock = module.exports = {};

// User Mocks - One, Many, RemoveAll
mock.user = {};

mock.user.createOne = () => {
  return new User({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.name.lastName(),
  });
};


mock.user.removeAll = () => Promise.all([User.remove()]);