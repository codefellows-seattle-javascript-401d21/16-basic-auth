#Part 2 Authorizations
1)client request to backend will be a https request

2)the backend will hash the password(and store it) then generate a token seed(aka compare-hash)

Once the password is hashed, the password is stored and never used again except to re-login or change password. The hash compare is a generated hahsed password compared to your hashed password

3) Create a token

4)send token back to the user. 
Client stores the token/. Tokens can have a timer of inactivity token that will automatically log out after a certqin amoutn of time

NOTE: Making a mock is important so you cna test one thing at a time.
like testing for api, then get, then post, etc. This allows you to make mock data for your test cases

#PART 2

#Editpad.org 
website used in the demo to generate a token

cmpare hadns/token seed ---> crypto "secret ----> Token ------> Token Seed returns

//this is for basic-auth-middleware.js
jsonWebToken.verify(token, process.env.APP_SECRET, (err, decodedValue) => { //jsonWebToken is a library to give us our token
  if(eror) {
    err.message = ERROR_MESSAGE
    return errorHandler(error, response)
  }
  //at this point we have our compare hash/token seed
  Auth.findOne({compareHash: decodedValue.token})
    .then(user => {
      if(!user)
      return errorHandler(new Error(ERROR_MESSAGE), response)
      request.user  = user //we are mutating the rewquest with a user. We muaute request based on success(verrify we are logged in)
      return next()
    })

})

use a crypto algorithim to get our hash password back