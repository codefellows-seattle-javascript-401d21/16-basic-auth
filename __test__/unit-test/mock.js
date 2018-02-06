'use strict';

const Auth = require('../../model/auth');
const faker = require('faker');

const mocks = module.exports = {};
mocks.Auth = {};
mocks.Auth.createOne = () => {
  let results = {};
  results.password = faker.internet.userName();
  return new Auth
}