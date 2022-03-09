# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /graspconfiguration

# add `/graspconfiguration/node_modules/.bin` to $PATH
ENV PATH /graspconfiguration/node_modules/.bin:$PATH

# install graspconfiguration dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add graspconfiguration app
COPY . ./

EXPOSE 3000

# start graspconfiguration app
ENTRYPOINT [ "npm", "run", "development"]  