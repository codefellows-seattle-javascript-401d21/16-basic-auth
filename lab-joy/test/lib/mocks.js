'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const mock = module.exports = {};

mock.auth = {};

mock.auth.createOne = () => new Auth({
    username: `${faker.internet.userName()}`,
    password: `${faker.internet.password()}`,
    email: `${faker.internet.email()}`,
}).save();

mock.auth.removeAll = () => Promise.all([Auth.remove()]);