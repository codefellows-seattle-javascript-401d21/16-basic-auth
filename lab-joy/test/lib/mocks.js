'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const mocks = module.exports = {};

mocks.auth = {};

mocks.auth.createOne = () => {
    // let result = {};
    // result.password = faker.internet.password();
    // console.log('password: ', result.password);

    let mockUser = new Auth({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    });
    // console.log('mockUser: ', mockUser);

    return mockUser.generatePasswordHash(mockUser.password)
        .then(user => {
            // console.log('user with password hash: ', user);
            // result.user = user;
            user.generateToken();
            return user;
        })
        .then(res => res);
};

mocks.auth.removeAll = () => Promise.all([Auth.remove()]);