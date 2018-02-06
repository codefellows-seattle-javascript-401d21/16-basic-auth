'use strict'

const faker = require('faker')
const User = require('../../model/auth.js')

const mock = module.exports = {}

// User Mocks - One, Many, RemoveAll
mock.user = {}
mock.user.createOne = () => new User({ username: faker.user.username(), email: faker.email(), password: faker.password()}).save()

mock.user.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.user.createOne))

mock.user.removeAll = () => Promise.all([User.remove()])

