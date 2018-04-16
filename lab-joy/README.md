# Lab 16-18: Basic Auth, Bearer Auth, and Image Uploads with AWS S3
Joy Hou, Feb 6-8th, 2018

## Description
In these labs, we are creating a system of authentication where a user enters their username and password. We then generate a password hash for their password, and to authenticate the user, compare the password hash to the one in the database. We generate a compare hash for their token after authenticating them and send the token back to client to store in the browser, so that they don't have to reauthenticate each time they request data from the API. We created basic auth and bearer auth middleware to handle the requests.

The models used in are a user/authentication model, a note model where the user can post notes, and a photo model where the user can attach photos to the notes.

## Installation and Use
Git clone this repository. From your terminal in the lab-joy directory, you can ```npm run test``` to run pre-existing tests and modify the test files to test new results.

## Modules, Routes, and Models
Index.js starts the server. The server module defines app dependencies and setup, middleware, and server controls. error-handler.js handles our errors. aws-s3 promisifies the photo uploads method to AWS. Auth, note, and photo models define the schemas for our relevant instances. Each model has a respective route file to handle input data to the server. 

## Tests
Labs include integration tests. Auth-get and auth-post tests for the /signin and /signup routes for our user/auth model. Note-get, note-post, note-put, and note-delete tests for our /note route, which allows users to post, retrieve, edit, and delete notes. Our photo-post and photo-get tests to see that an image is posted to AWS and that we are able to retrieve that image. 

