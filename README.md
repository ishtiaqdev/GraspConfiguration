# Grasp Configuration for Robotics

A simple Grasp Configuration web application for robotics to pick up objects - developed using React hooks, Node, Express, MongoDB and Docker.

#### What you need to run this code
1. Node (13.12.0)
2. NPM (6.14.4) or Yarn (1.22.4)
3. MongoDB (4.2.0)

####  How to run the Application
1. Make sure MongoDB is running on your system 
2. Clone this repository
3. Open command line in the cloned folder,
   - To install dependencies, run `npm install`
   - To run the application for development, run `npm run development`
4. Open [localhost:3000](http://localhost:3000/) in the browser


#### How to run the Application with Docker

1. Install Docker for Mac/Windows or Docker Toolbox - https://www.docker.com/products/overview
2. Run `npm install`
3. Uncomment "mongo" line # 10 and comment "localhost" line # 9 in config.js file in config folder in root directory to configure MongoDB for docker run.
4. Run `docker-compose up -d --build` to build the image of container and run the container
5. Open [localhost:3000](http://localhost:3000/) in the browser
