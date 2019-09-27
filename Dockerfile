ARG NODE_BASEIMAGE=docker.dbc.dk/node10:latest
# ---- Base Node ----
FROM  $NODE_BASEIMAGE AS build
# set working directory
WORKDIR /home/node/app
# copy project file
COPY . .
COPY .babelrc .

ENV CI=true

# install node packages
RUN npm set progress=false && npm config set depth 0 && \
    npm install --only=production && \
    mkdir prod_build && \
    cp -R --preserve=links node_modules prod_build/node_modules && \
    npm install

# build statics
RUN npm run build && \
    cp -R public prod_build/public && \
    cp -R --preserve=links src prod_build/src && \
    cp -R package.json prod_build/package.json && \
    cp -R .babelrc prod_build/.babelrc

# run test @see package.json
RUN npm run test

#
# ---- Release ----
FROM $NODE_BASEIMAGE AS release
ENV  BABEL_CACHE_PATH=~/app/babel.cache.json
WORKDIR /home/node/app
COPY --chown=node:node --from=build /home/node/app/prod_build ./
EXPOSE 8080
USER node
CMD node src/main.js

