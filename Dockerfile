FROM node:10.15-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm install --loglevel warn --ignore-scripts
RUN npm rebuild node-sass
COPY . ./
EXPOSE 8080
CMD [ "npm", "run", "dev" ]

# Reference: https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f
