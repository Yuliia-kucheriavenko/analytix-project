### git clone [Analytix] (https://github.com/Yuliia-kucheriavenko/analytix.git)
### [DEMO LINK] (https://6642fa83496fcb9472ba45e0--neon-naiad-60a38f.netlify.app/) - not connect with server part

cd analytix/server
### `npm install`

cd ../client
### `npm install`

cd server
### `npm start`


cd client
### `npm start`

## Documentation for API

POST /api/registration

POST /api/login

POST /api/logout

GET /api/users

GET /api/refresh

## Resources


### User Registration
Method: POST
Path: /api/registration
Description: Creates a new user in the system.
Request Parameters:
username (string): user's username
useremail (srting): user's email
password (string): user's password
role (string): user's role
Response:
Success: status 200 and object with information about the created user.
Error: status 400 and error message.


 ### User Login
Method: POST
Path: /api/login
Description: Authenticates a user in the system.
Request Parameters:
username (string): user's username
password (string): user's password
role (string): user's role

Response:
Success: status 200 and access token.
Error: status 401 and error message.


### User Logout
Method: POST
Path: /api/logout
Description: Logs out a user from the system.
Response:
Success: status 200 and message about successful logout.
Error: status 400 and error message.


### Get Users
Method: GET
Path: /api/users
Description: Returns a list of all users in the system.
Response:
Success: status 200 and array of objects with information about users.
Error: status 400 and error message.


### Refresh Token
Method: GET
Path: /api/refresh
Description: Refreshes a user's access token.
Response:
Success: status 200 and new access token.
Error: status 400 and error message.