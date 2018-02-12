># Lab 16: Basic Auth

 A basic express server with basic authorization middleware and get and post routes for basic for signup/signin functionality and a mongodb for persistance.

  - POST - Create a user account and save the username, email and a hashed password for hashed encryption comparison. 

  - GET - Sign in using a basic authorization header

>## Install

```BASH
    npm i
```

### Dependencies 

- This project has the following dependencies:

```JSON
   "devDependencies": {
    "debug": "^3.1.0",
    "faker": "^4.1.0",
    "jest": "^22.1.4",
    "superagent": "^3.8.2"
  },
  "dependencies": {
    "bcrypt": "^1.0.3",
    "body-parser": "^1.18.2",
    "cors": "^2.8.4",
    "dotenv": "^5.0.0",
    "express": "^4.16.2",
    "jsonwebtoken": "^8.1.1",
    "mongoose": "^5.0.3"
  }
```

### npm scripts

- The following npm scripts are available:

```JSON
    "scripts": {
    "start": "node index.js",
    "start:watch": "nodemon index.js",
    "start:debug": "DEBUG=http* nodemon index.js",
    "test": "jest -i",
    "test:watch": "jest -i --watchAll",
    "test:debug": "DEBUG=http* jest -i",
    "lint": "eslint .",
    "start-db": "mkdir -p ./data/db && mongod --dbpath ./data/db",
    "stop-db": "killall mongod"
  }
```

#### Run the tests!

Normal mode

```BASH
    npm test
```

Debug mode

```BASH
    npm run test:debug
```

#### Start the server

Start

```BASH
    npm start
```

Debug mode

```BASH
    npm run start:debug
```


#### Start the database

Start

```BASH
    npm run start-db
```


>## Usage

### Post

  - Create a new user by sending a POST request to /api/v1/signup 
  
  - send a body that contains a 'username', 'email' and 'password'

  - The response will contain a JSON web token..


```BASH
    http POST :3000/api/v1/signup username='Kevin Miller' email='me@you.com' password='misslabeled'
    HTTP/1.1 201 Created
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 205
    Content-Type: application/json; charset=utf-8
    Date: Mon, 12 Feb 2018 05:16:33 GMT
    ETag: W/"cd-GZEW9jHgiFNUv954fKKC2G/qcPU"
    X-Powered-By: Express

    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3QiOiIxOGQ0OTgxNTE4NmFiNDNmYzRmOWY3MDIyMGY0NjAxOTQ4OThjYjdhNjMwMWMxNjE3ZWU0NTgyMGFmYzQ5NjFlIiwiaWF0IjoxNTE4NDEyNTkzfQ._RUwIlfPOjl0XNs-WCW-bt8RN_GyGtfoVFzIFqIWwls"
```

### GET 

  - Make a get request with a basic auth header to /api/v1/signin 
  
  - The response will contain a JSON web token.

```BASH
    http -a 'Kevin Miller:misslabeled' :3000/api/v1/signin
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 205
    Content-Type: application/json; charset=utf-8
    Date: Mon, 12 Feb 2018 05:21:50 GMT
    ETag: W/"cd-dILWxnUJXOWdWR8VY0MV2rZLzwI"
    X-Powered-By: Express

    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3QiOiIyYjdhNDI1OWMzOTU0NmQyOTE3MjBlYzljYzJlZjA4YjBhMTYwOTY0MmY5YzFmMGM5OGViOTI3MWNiOWQzOWMzIiwiaWF0IjoxNTE4NDEyOTEwfQ.m12eAlQwPTYugoq9OkQogvzhujZfg-y4pqgy3R3EmHY"

```

