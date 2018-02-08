'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const Note = require('../../model/note');
const mocks = module.exports = {};

// Auth Mocks
mocks.auth = {};

mocks.auth.createOne = () => {
    let result = {};
    result.password = faker.internet.password();
    // console.log('password: ', result.password);

    let mockUser = new Auth({
        username: faker.internet.userName(),
        email: faker.internet.email(),
    });
    // console.log('mockUser: ', mockUser);

    return mockUser.generatePasswordHash(result.password)
        .then(user => result.user = user)
        .then(user => user.generateToken())
        .then(token => result.token = token)
        .then(() => {
            return result;
        });
};

// Note Mocks
mocks.note = {};

mocks.note.createOne = () => {
    let result = null;
    
    return mocks.auth.createOne()
        .then(user => result = user)
        .then(userMock => {
            return new Note({
                name: faker.internet.domainWord(),
                content: faker.random.words(15),
                userId: userMock.user._id,
            }).save(); 
        })
        .then(note => {
            result.note = note;
            return result;
        });
};

// Remove
mocks.auth.removeAll = () => Promise.all([Auth.remove()]);
mocks.note.removeAll = () => Promise.all([Note.remove()]);