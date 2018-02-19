# ubiquitous-train

##  Build

### Requirements

* Node
* npm

### Steps to  build

1. `npm install`
2. `NODE_ENV=development node app.js`
3. navigate browser to `localhost:3001`

#### Environment Variables

These variables can be set in when starting the application:

* NODE_ENV - This is to distinguish whether to use prod or dev settings
  * production
  * development
  
* PROVISION_DB - Determines whether the database should be provisioned.
  * true ___requires NODE_ENV=development___
  * false
