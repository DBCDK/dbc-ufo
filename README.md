# dbc-ufo
Grænseflade til upload af billeder til DBC's Forsideservice

[![Build Status](https://travis-ci.org/DBCDK/dbc-ufo.svg?branch=master)](https://travis-ci.org/DBCDK/dbc-ufo)
[![bitHound Overall Score](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/score.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo)
[![bitHound Dependencies](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/dependencies.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo/dbc-ufo-1-mmj/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/devDependencies.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo/dbc-ufo-1-mmj/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/DBCDK/dbc-ufo/badges/code.svg)](https://www.bithound.io/github/DBCDK/dbc-ufo)

##Environment variables
The variables are specified at the form `name : internal config object`. References in the log from the startup, will use the internal config object.
- `PORT` : `app.port`  
Specifies the port to expose the application. Default: `3010`

- `NODE_ENV` : `app.env`  
Specifies the development for the application. Default: `default`

- `APP_NAME` : `app.name`  
Used to identify the app in i.e. logs. Default': `no name`

- `LOG_LEVEL` : `log.level`  
Specifies the log level used by the application. Defaults to `INFO`
Log level constants supported:: `OFF` (0), `ERROR` (1), `WARN` (2), `WARNING` (2), `INFO` (3), `DEBUG` (4), `TRACE` (5)

- `PRETTY_LOG` : `log.pretty`  
Set to `1` (`PRETTY_LOG=1`) for pretty printed log statements. Any other setting, will result in one-line log statements.
