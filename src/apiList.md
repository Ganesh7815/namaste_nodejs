authRouter
- post /signup
- post /login
- post /logout
profileRouter
- get /profile/view
- patch /profile/update
- patch /profile/password

connectionRequestRouter
- post /request/send/interested/:userId
- post /request/send/ignore/:userId
- post /request/review/accepted/:requestId
- post /request/review/rejected/:requestedId



- get /connections
- get /requests/received
- get /feed - gest you the profiles of other users on the platform
status - ignore,interested,accepted,rejected
