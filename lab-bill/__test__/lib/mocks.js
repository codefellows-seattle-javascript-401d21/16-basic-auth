'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
// const errorHandler = require('../../lib/error-handler');
const mock = module.exports = {};


mock.auth = {};

mock.auth.createOne = () => new Auth({ 
  username: faker.hacker.adjective(),
  password: faker.hacker.adjective(),
  email: faker.hacker.adjective(),
}).save();

mock.auth.removeAll = () => Promise.all([Auth.remove()]);