'use strict';

const debug = require('debug')('http:auth-get-test');
const server = require('../../lib/server');
const superagent = require('superagent');
const Auth = require('../../model/auth');
const mock = require('../lib/mock');
require('jest');

describe('GET Integration', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  //afterAll(mock.removeUsers);


  this.url = ':4000/api/v1';
  
  describe('Valid requests', () => {
   
    beforeAll(() => {
      this.user = mock.user;
      return mock.createUser();
    });
  
    beforeAll(()=> {
      debug('userinfo', `${this.user.username}:${this.user.password}`);
      return  superagent.get(`${this.url}/signin`)
        .auth(`${this.user.username}:${this.user.password}`)
        .then( res => {
          this.resGet = res;
        })
        .catch(err => {
          debug('superagent error ', err);
        });
    });

    it('should return status code 200', () => {
      expect(this.resGet.status).toEqual(200);
    });
    

    // describe('GET /api/v1/note => fetchAll', () => {
      
    //   beforeAll(() => {
    //     return superagent.get(':4000/api/v1/note')
    //       .then(res => this.getAll = res);       
    //   });

    //   it('should contain id of post in array', () => {
    //     debug('this.getAll.body', Array.isArray(this.getAll.body));
    //     debug('this.getAll.text', this.getAll.text);
    //     expect(this.getAll.body).toEqual(expect.arrayContaining([this.resPost.body.id]));
        
    //   });
    //   it('should return status code 200', () => {
    //     expect(this.getAll.status).toEqual(200);
    //   });
    // });
  
  });

});