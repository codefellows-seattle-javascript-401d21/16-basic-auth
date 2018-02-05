'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/cfgram`;

describe('Route Testing', () => {
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());
  afterAll(mocks.auth.removeAll);

  describe('GET /api/v1/cfgram', () => {
    beforeAll(() => {
      return mocks.auth.createOne()
        .then(auth => this.mockAuth = auth);

      //   return superagent.post(api)
      //     .send(this.mockLotr)
      //     .then(res => this.response = res);
      // });
    });
    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.get(`${api}/${this.response.body.username}`)
          .then(res => this.response = res);
      });
      it('Should respond with a status 200', () => {
        expect(this.response.status).toBe(200);
      });
    });

    // describe('Invalid Routes/Data', () => {
    //   it('Should respond a not found or path error when given an incorrect path', () => {
    //     return superagent.get(`${api}/invalididparameter`)
    //       .catch(err => {
    //         expect(err.response.text).toMatch(/ObjectId failed/);
    //       });
    //   });
    //   it('Should respond a 404 bad path when given an incorrect path', () => {
    //     return superagent.get(`${api}/invalididparameter`)
    //       .catch(err => {
    //         expect(err.status).toBe(404);
    //       });
    //   });
    // });
  });
});