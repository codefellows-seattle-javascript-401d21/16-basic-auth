'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;
const mock = require('../lib/mock');
const Auth = require('../../model/auth');

describe('GET /api/v1/signin', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => Auth.remove());
  
  
  let resOne;
  describe('Valid req/res', () => {

    let mockAuth = mock.auth.createOne();
    beforeAll(() => {
      return superagent.post(`:${PORT}/api/v1/signup`)
        .send({'username': mockAuth.username, 'password': mockAuth.password, 'email': mockAuth.email});
    });
    beforeAll(() => {
      return superagent.get(`:${PORT}/api/v1/signin`)
        .auth(mockAuth.username, mockAuth.password)
        .then(res => resOne = res);
    });
      
    test(
      'should respond with http res status 200',
      () => {
        expect(resOne.status).toBe(200);
      });

  });

  describe('Invalid req/res', () => {

    test(
      'should respond with http res status 400 if invalid password passed',
      () => {
        return superagent.get(`:${PORT}/api/v1/signin`)
          .auth()
          .catch(err => expect(err.status).toBe(401));
      });

    test(
      'should respond with http res status 400 if no username passed',
      () => {
        return superagent.get(`:${PORT}/api/v1/signin`)
          .auth()
          .catch(err => expect(err.status).toBe(401));
      });

    test(
      'should respond with http res status 400 if no username and password passed',
      () => {
        return superagent.get(`:${PORT}/api/v1/signin`)
          .auth()
          .catch(err => expect(err.status).toBe(401));
      });
  });

  describe('Invalid route - not /signin', () => {

    test(
      'should respond with http res status 500 if invalid route - not /signin',
      () => {
        return superagent.get(`:${PORT}/api/v1/invalidsignin`)
          .auth()
          .catch(err => expect(err.status).toBe(404));
      });
  });
});
