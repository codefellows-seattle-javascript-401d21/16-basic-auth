'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./error-handler');

const app = express();
app.use(cors);

const router = app.Router();

require('../router.route')(router);

app.use('/api/v1/note', router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error: Path not found'), res));

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server already running'));
    server.http = app.listen(process.env.PORT, () => {
      console.log(`Listening on ${process.env.PORT}`);
      server.isOn = true;
      server.db = mongoose.connect(process.env.MONGO_URI)
    });
    resolve(server);
  });
};

server.stop = () => {
  return new Promise( (resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server already stopped'));
    console.log('Server shutting down');
    server.isOn = false;
    server.http.close();
    server.db.disconnect();
  });
};
