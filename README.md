Core functions of this project belong to `https://github.com/petrleocompel/docker-dash` as a part of internship.
This version is developed in free time for personal usage.
I participated in back-end part of the project. 
After internship, I refactored front-end and made new features. Such as toggling Docker daemon based on different configuration and its environments (docker composes and containers). 
For the final usage is needed make some tweaks and changes to get the project working properly with no side effects.







_______________________________________________________________________________________________________________

# docker-dash

 - Java server
    - Swagger
    - Docker-Api
    - DBMaker - file DB - for storing docker connections  
 - React client
    - list, restart, start, stop - of environment and container
    - blacklist crud
    - use
        - react@16
        - reactstrap@4.8 | 5?
        - react-router@4
        - webpack@3
        - react-hot@3
        - happypack@4
        - flow

## Additional Features
 
 - reconstruct docker-compose
 - docker update
 
 
## Custom system indicators

### Container | Environment blacklist

 - In system - save to DB
 - Label - cz.plc.prx.docker.dash.blacklist=true

