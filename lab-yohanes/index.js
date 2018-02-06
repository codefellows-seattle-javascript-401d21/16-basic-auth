'use strict';

require('dotenv').config(`${__dirname}/.env`);
require('./lib/server').start();
console.log(process.env.MONGODB_URI);