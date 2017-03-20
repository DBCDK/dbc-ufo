FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

expose 8000

CMD ["npm", "build"]
CMD ["npm", "serve"]
