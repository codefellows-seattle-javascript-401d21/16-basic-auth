'use strict';

const faker = require('faker');
const Auth = ('../../model/auth');

const mock = module.exports = {};

// auth Mocks - One, Many, RemoveAll
mock.auth = {};

mock.auth.createOne = () => new Auth({ username: faker.hacker.adjective() }).save();

// mock.species.createMany = n =>
//   Promise.all(new Array(n).fill(0).map(mock.species.createOne));

mock.auth.removeAll = () => Promise.all([Auth.remove()]);


// lotr Mocks - One, Many, RemoveAll
// mock.lotr = {};

// mock.lotr.createOne = () => {
//   let result = {};

//   return mock.species.createOne()
//     .then(species => {
//       result.species = species;
//       return new Lotr({
//         name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//         species: species._id.toString(),
//       }).save();
//     })
//     .then(lotr => result.lotr = lotr)
//     .then(() => result);
// };

// mock.lotr.createMany = n => {
//   let result = {};

//   return mock.species.createOne()
//     .then(species => {
//       result.species = species;
//       let lotrProms = new Array(n).fill(0).map(() => new Lotr({
//         name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//         species: species._id.toString(),
//       }).save());
//       return Promise.all(lotrProms);
//     })
//     .then(lotr => result.lotr = lotr)
//     .then(() => result);
// };

//mock.lotr.removeAll = () => Promise.all([Lotr.remove()]);
