FROM node:17-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 2000
CMD npm start
