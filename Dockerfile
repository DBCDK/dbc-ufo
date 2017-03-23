FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
RUN npm run build

COPY . /usr/src/app

expose 8000

ENTRYPOINT ["npm", "run"]
CMD ["serve"]
