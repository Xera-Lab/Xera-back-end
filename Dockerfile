# Fetching the minified node image on apline linux
# FROM --platform=linux/amd64 node:slim
FROM node:slim

# Setting up the work directory
WORKDIR /xera_app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Installing Sequelize CLI
RUN npm install -g sequelize-cli

# Exposing server port
EXPOSE 3000