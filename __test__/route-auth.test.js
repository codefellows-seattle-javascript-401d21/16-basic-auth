'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const auth = require('../model/auth');
const faker = require('faker');
require('jest');

describe('POST /api/v1/signup', function() {
  beforeAll(() => this.mockUser = {username: 'bob', password: 'idiot', email: 'b@b.com'});
  beforeAll(() => server.start());
  
  afterEach(() => {
    auth.remove({}, (err) => {
      console.error(err);
    });
  });
  afterAll(() => server.stop());

  describe('valid requests', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/signup`)
        .send(this.mockUser)
        .then(res => this.response = res);
    });


    it('should return a status code of 201 CREATED', () => {
      expect(this.response.status).toBe(201);
    });
    it('should return a 400 code if no username', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/signup`)
        .send({password: 'something', email: 'y@y.com'})
        .catch((response) => {
          expect(response.status).toBe(400);
        });
    });
   
   
  });
  
});

describe('GET /api/v1/signin', function() {
  
  beforeAll(() => this.mockUser = {username: 'peter', password: 'password', email:'p@p.com'});
  beforeAll(() => server.start());
    
  afterEach(() => {
    auth.remove({}, (err) => {
      if(err != null) console.error(err);
    });
  });
  afterAll(() => server.stop());

  describe('valid requests', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/signup`)
        .send(this.mockUser)
        .then(res => this.response = res);
    });


    it('should return a status code of 200 ', () => {
      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
        .auth(`${this.mockUser.username}:${this.mockUser.password}`)
        .then(res => {
          //console.log('res body',res.body);
          expect(res.body).not.toEqual('');
          expect(res.status).toBe(200);
        
        });
    });

    it('should return a 401 code if no username', () => {
      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
        .auth(`${this.mockUser.password}`)
        .catch((response) => {
          expect(response.status).toBe(401);
        });
    });
   
  });
  
});