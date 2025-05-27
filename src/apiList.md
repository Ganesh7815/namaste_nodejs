authRouter
- post /signup
- post /login
- post /logout
profileRouter
- get /profile/view
- patch /profile/update
- patch /profile/password

connectionRequestRouter
- post /request/send/:status/:userId  - ignored,interested

- post /request/review/:status/:requestId   - accepted,rejected




- get /requests/received

- get /connections
- get /feed - gest you the profiles of other users on the platform
status - ignore,interested,accepted,rejected
