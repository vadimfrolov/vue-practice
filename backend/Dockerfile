# Use a more recent Node.js version, such as 16
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
