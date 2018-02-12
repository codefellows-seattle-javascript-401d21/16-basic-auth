'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const debug = require('debug')('http:mock');

debug('mocks');

const mock = module.exports = {};

mock.auth = {};

mock.new_user = () => {
  return {
    username: `${faker.name.prefix()}${faker.hacker.adjective()}`.replace(/[.\s]/, ''),
    email: `${faker.internet.email()}`,
    password:`${faker.hacker.adjective()}${faker.hacker.noun()}`.replace(/[.\s]/, ''),
  };
};

mock.auth.createUser = () => {
  let auth_data = {};
  mock.user = mock.new_user();
  debug('mock.user', mock.user);
  auth_data.password = mock.user.password;
  let newUser = Auth({username: mock.user.username, email: mock.user.email});
  return newUser.createHashedpassword(auth_data.password)
    .then(() => newUser.save())
    .then(() => newUser.createToken())
    .then(token =>{
      auth_data.user = newUser;
      auth_data.user_token = token;
      return auth_data;
    })
    .catch(err => err);
};

mock.removeUsers = () => Promise.all([Auth.remove()]); 




