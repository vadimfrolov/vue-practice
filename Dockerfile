FROM node:16-bullseye

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 8080

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "serve"]