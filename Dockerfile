FROM node:6.9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

RUN npm run build

expose 8000

ENTRYPOINT ["npm", "run"]
CMD ["serve"]
