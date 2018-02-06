'use strict'

const faker = require('faker');
const Auth = require('../../model/auth.js');

const mock = module.exports = {};

// Auth Mocks - One, RemoveAll
mock.auth = {}

mock.auth.createOne = () => new Auth({
    username: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password: faker.hacker.adjective(),
    email: `${faker.hacker.adjective()}@${faker.hacker.adjective()}.${faker.hacker.adjective()}`
  }).save();

mock.auth.removeAll = () => Promise.all([Auth.remove()])
