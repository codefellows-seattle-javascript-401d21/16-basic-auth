'use strict';

const Auth = require('../../model/auth');
const faker = require('faker');

const mocks = module.exports = {};
mocks.auth = {};

mocks.auth.createOne = () => {
    let result = {};
    result.password = faker.internet.password();

    return new Auth({
        username: faker.internet.userName(),
        email: faker.internet.email(),
    })
        .generatePasswordHash(result.password)
        .then(user => result.user = user)
        .then(user => user.generateToken())
        .then(token => result.token = token)
        .then(() => {
            return result;
        });
};

mocks.auth.removeAll = () => Promise.all([Auth.remove()]);