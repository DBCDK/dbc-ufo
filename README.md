# dbc-ufo

Webapplication for uploading images to Moreinfo webservice.

[![Build Status](https://travis-ci.org/DBCDK/dbc-ufo.svg?branch=master)](https://travis-ci.org/DBCDK/dbc-ufo)
[![bitHound Overall Score](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/score.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo)
[![bitHound Dependencies](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/dependencies.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo/dbc-ufo-1-mmj/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/devDependencies.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo/dbc-ufo-1-mmj/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/code.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo)

##Start
###Development
After cloning the repository, run `npm install` to install dependencies. Copy env.test to env.env and set the environment variables (see below) to you need/liking. The application is started with `npm run dev`, which include [nodemon](https://www.npmjs.com/package/nodemon) in order to restart the application, when the code is changed.

###Production
You can start the application with `node src/main.js` from the project root after setting the environment variables.

##Environment variables
The variables are specified at the form `name : internal config object`. References in the log from the startup, will use the internal config object.

### Application

- `PORT` : `app.port`  
  Specifies the port to expose the application. Default: `3010`

- `NODE_ENV` : `app.env`  
  Specifies the development for the application. Default: `default`

- `APP_NAME` : `app.name`  
  Used to identify the app in i.e. logs. Default': `no name`

### Log

- `LOG_LEVEL` : `log.level`  
  Specifies the log level used by the application. Defaults to `INFO`
  Log level constants supported:: `OFF` (0), `ERROR` (1), `WARN` (2), `WARNING` (2), `INFO` (3), `DEBUG` (4), `TRACE` (5)

- `PRETTY_LOG` : `log.pretty`  
  Set to `1` (`PRETTY_LOG=1`) for pretty printed log statements. Any other setting, will result in one-line log statements.

### Moreinfo update

- `MOREINFO_UPDATE_URI` : `http://moreinfoupate_uri`  
  The url to the moreinfo update service

### Open platform

- `SMAUG_CLIENT_ID` : `smaug.client_id`  
  The Smaug client ID for this application

- `SMAUG_CLIENT_SECRET` : `smaug.client_secret`  
  The Smaug client secret for this application

- `SMAUG_URI` : `smaug.uri`  
  The address of the Smaug service

- `SERVICE_PROVIDER_URI` : `https://openplatform_uri_`  
  The url to the openplatform service

### Forsrights

- `FORS_RIGHTS_URI` : `http://forsrights_uri_`  
  The url to the forsrights service

- `FORS_RIGHTS_URI_TEST_USER` : `username`  
  Forsrights test user name

- `FORS_RIGHTS_URI_TEST_AGENCY` : `agency_id`  
  Forsrights test agency ID

- `FORS_RIGHTS_URI_TEST_PASSWORD` : `password`  
  Forsrights test user password

### Session

- `SESSION_KEY` : `session_key_`  
  Key for the session store

- `REDIS_CONNECTION_STRING` : `redis://127.0.0.1:6379`  
  Redis connection for sessions. If not specified, default is memory-storage for sessions

### Mocks

- `MOCK_SMAUG` : `0|1`
- `MOCK_FORS_RIGHTS` : `0|1`
- `MOCK_MOREINFO_UPDATE` : `0|1`  
  Mock webservices (optional)

## Architecture

[Overview of application structure](/docs/architecture.pdf)
