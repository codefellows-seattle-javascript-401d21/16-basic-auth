'use strict'

const Auth = require('../../model/auth')
const bodyParser = require('body-parser').json()
const errorHandler = require('../../lib/error-handler')
const basicAuth = require('../../lib/basic-auth-middleware')

const server = require('../../lib/server')
const superagent = require('superagent')

require('jest')

const user = new Auth({ username: 'steve',email: 'steve@gmail.com', password: 'stevie' })

describe('POST to end point', function(){
describe('valid request', () => {
    test('should return 201', () => {

    superagent.post(':4000/api/v1/signup')
      .send({ username: 'steve', email: 'steve@gmail.com', password: 'stevie' })
      .then(res => {
               expect(res.status).toBe(201)
               expect(res.body).toExist()
             })
             .catch(function(err) {
                err.message, err.response
             });
    })
})
describe('invalid request', () => {
  test('should return 400 if no password is provided', () => {
  superagent.post(':4000/api/v1/signup')
    .send({ username: 'nopasswordboy', email: 'tina@gmail.com' })
    .then(res => {
             expect(res.status).toBe(400)
           })
           .catch(function(err) {
              err.message, err.response
           });
  })

})

})


describe('GET /api/v1/signin', function() {
describe('valid get requests', () => {
    it('return 200', () => {

superagent.get(`:4000/api/v1/signin`)
.query({ username : "steve", password: "stevie" })
.then(res => {
         expect(res.status).toBe(200)
         expect(res.body).toExist()
       })
       .catch(function(err) {
          err.message, err.response
       });
    })
    })

  describe('invalid get requests', () => {
    it('return 400 if no body is sent with GET', () => {
    superagent.get(`:4000/api/v1/signin`)
    .query()
    .then(res => {
            expect(res.status).toBe(400)
           })
           .catch(function(err) {
              err.message, err.response
           });

        })
        })


  })
