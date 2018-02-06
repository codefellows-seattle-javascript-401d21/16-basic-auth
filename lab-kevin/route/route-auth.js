'use strict';

const debug = require('debug')('http:route-auth');
const basicAuth = require('../lib/basic-auth-middleware');
const bodyParser = require('body-parser');
const errorHandler = require('../lib/error-handler');
const Auth = require('./model/auth');

module.exports = function(router) {

  router.get('/signin', (req, res) => {
    debug('req.auth', req.auth);
  });

  router.post('/signup', bodyParser, (req, res) => {
    debug('req.body', req.body);
    if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) return errorHandler(new Error('Bad Request'),res);
    let pswd = req.body.password;
    delete req.body.password;
    let user = new Auth(req.body);
    user.createHashedpassword(pswd)
      .then(() => user.save())
      .then(user.createToken())
      .then(jwt => res.status(201).json(jwt))
      .catch(err => errorHandler(err,res));
  });
};

