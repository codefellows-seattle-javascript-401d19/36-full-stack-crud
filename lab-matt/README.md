# 36: Full Stack Crud
Description: **Lab 36 of Code Fellows JavaScript 401d19** </br>
Author: **Matthew LeBlanc** </br>
Date: **01/22/18**

## Features
This lab features a full stack application that uses react in the front-end and express in the backend. When an item is created, updated, deleted, or retrieved it sends an http request to the backend, which utilizes mongodb for persistence.

## Tech/Framework Used
- react
- express
- redux
- node.js
- javascript
- Visual Studio Code

## Usage
1. `cd` into the lab-matt folder
1. `cd` into the backend folder
2. `npm install` the required dependency packages
1. setup a `.env` file with the following parameters:
```
PORT=3000     // or a port of your choice
MONGODB_URI=mongodb://localhost/live     // 'live' can be replaced with your db name
```
2. `npm run dbon` to start the server
4. run `nodemon -ignore log.json` or other methods to start up the server
1. `cd` into the frontend folder
2. `npm install` the required dependency packages
4. `npm run watch` to run a local server to use the front-end react
6. connect to `http://localhost:8080`

3. `npm run lint` from either frontend/  or  backend/ directory to run eslint
3. `npm run build` to run the babel/sass transpiler from the front-end

## Dependencies (backend)
```
"devDependencies": {
    "eslint": "^4.13.1",
    "jest": "^21.2.1"
  },
  "dependencies": {
    "cors": "^2.8.4",
    "dotenv": "^4.0.0",
    "express": "^4.16.2",
    "faker": "^4.1.0",
    "http-errors": "^1.6.2",
    "mongoose": "^4.13.7",
    "superagent": "^3.8.2",
    "winston": "^2.4.0"
  }
```

## Dependencies (frontend)
```
"dependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.9",
    "extract-text-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^2.30.1",
    "node-sass": "^4.7.2",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-redux": "^5.0.6",
    "react-router-dom": "^4.2.2",
    "redux": "^3.7.2",
    "resolve-url-loader": "^2.2.1",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.19.1",
    "superagent": "^3.8.2",
    "uuid": "^3.2.1",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.11.0"
  },
  "devDependencies": {
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "eslint": "^4.15.0",
    "eslint-plugin-react": "^7.5.1",
    "jest": "^22.1.2",
    "redux-devtools-extension": "^2.13.2"
  }
```