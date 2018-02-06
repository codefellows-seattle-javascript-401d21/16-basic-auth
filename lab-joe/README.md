Lab 16 - Feb 6 2018

The assignment for this lab was to build upon the code written by Scott in class by writing four tests to handle the route methods for the route model.

We were to test the success and failure responses of both the 'POST /api/signup' and 'GET /api/signin'

I sent valid and invalid data to get these responses. 

Server Endpoints
/api/signup
POST request
the client should pass the username and password in the body of the request
the server should respond with a token (generated using jwt)
the server should respond with 400 Bad Request to a failed request
/api/signin
GET request
the client should pass the username and password to the server using a Basic: authorization header
the server should respond with a token for authenticated users
the server should respond with 401 Unauthorized for non-authenticated users
Tests
create a test that will ensure that your API returns a status code of 404 for any routes that have not been registered
/api/signup
POST - test 400, if no request body has been provided or the body is invalid
POST - test 200, if the request body has been provided and is valid
/api/signin
GET - test 401, if the user could not be authenticated
GET - test 200, responds with token for a request with a valid basic authorization header
