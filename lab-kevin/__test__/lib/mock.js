'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');

const mock = module.exports = {};


mock.user = {
  username: `${faker.name.prefix()}${faker.hacker.adjective()}`.replace('.', ''),
  email: `${faker.internet.email()}`,
  password:`${faker.hacker.adjective()}${faker.hacker.noun()}${faker.hacker.verb()}`,
};

mock.createUser = () => {
  let userCreds = this.user;
  let pswd = userCreds.password;
  delete userCreds.password; 
  let newUser = new Auth(this.user);
  return newUser.createHashedpassword(pswd)
    .then(() => this.auth.save())
    .then(() => this.auth.createToken())
    .then(jwt => this.token = jwt)
    .catch(console.err);
};


mock.removeUsers = () => Promise.all([Auth.remove()]); 



