ARG PORT=8000

FROM node

WORKDIR /usr/src/api

COPY package.json .

RUN npm install

EXPOSE ${PORT}

COPY . .

CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "server" ]
