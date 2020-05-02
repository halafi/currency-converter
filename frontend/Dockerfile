ARG PORT=8080

FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

EXPOSE ${PORT}

COPY . .

CMD [ "npm", "run", "build" ]
CMD ["sh", "-c", "npx http-server --port ${PORT} ./dist"]

