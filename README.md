This project belongs to `https://github.com/petrleocompel/docker-dash` as a part of internship.

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
