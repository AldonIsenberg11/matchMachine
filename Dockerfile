FROM node:10.10.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install --loglevel warn --ignore-scripts
COPY . ./
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

# Reference: https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f
