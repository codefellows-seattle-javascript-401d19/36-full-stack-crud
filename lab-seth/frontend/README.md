# 36#: Budget & Expect Tracker with React & Redux & Middleware and a Full BackEnd Database
This app allows a user to input a category, budget for that category, and individual expense for each category through two basic forms and save it to the state of of the landing, where it dynamically gets rendered to the page using React. The Category can be updated or deleted once created using the same form, as well as each expense.

## Features
This app uses middleware to create a chain on commands for error catching and logging for changes to the state through Redux.
There is a backend that takes all the CRUD requests for the database and loads the database onto the page if there are items in it.

## Tech / Framework
- React
- Redux
- Node.js
- Javascript
- VS Code

## Usage
1.) In terminal navigate to the lab-seth folder.

2.) ```npm install``` the modules required

3.) ```npm run build``` to build the files for transpiling

4.) ```npm run watch``` to launch a local server to see the app @ **localhost:8080** in a browser.


## Routes Explanation

### URL: /api/expense?id={**_id_**}  & /api/category?id={**_id_**}

#### GET: 
  - If a valid **id** is given:
    - Server response: _object with that Item's properties as key:value pairs from the database and a 200 status code_
  - If **_NO id or an incorrect id_** is given:
    - Server response: 404 Error saying expense is not found.
#### POST: 
  - If valid **information** is given:
    - Server response: _stores the new Item in the database and sends a 200 status code_
  - If the **_id is incorrect, was not given, or the data given does not have the required types and minimum level_**:
    - Server response: _400 error_ stating that body and content are rquired.
#### PUT: 
  - If a valid **id** is given:
    - Server response: _stores the updated Item info in the database and sends a 200 status code_
  - If the **_id is incorrect, was not given, or the data given does not have the required types_**:
    - Server response: _400 error_ stating that body and content are rquired.
#### DELETE: 
  - If a valid **id** is given:
    - Server response: _deletes the expense from the database and sends a 204 status_
  - If the **_id is incorrect or was not given_**:
    - Server response: _404 error_ Item Not Found




## Front End Dependencies

- babel
- babel-loader
- babel-plugin-transform-object-rest-spread
- babel-preset-env
- babel-preset-react,
- css-loader,
- eslint-plugin-react
- extract-text-webpack-plugin
- html-webpack-plugin,
- node-sass
- react,
- react-dom,
- react-redux
- react-router-dom
- resolve-url-loader
- redux
- sass-loader
- style-loader
- superagent
- uuid
- webpack,
- webpack-dev-server
  
  #### Dev
- enzyme
- enzyme-adapter-react-16
- jest

## Back End Dependencies
- Eslint
- Node
- jest
- superagent
- dotenv
- Winston
- Faker
- Javascript /ES6
- express
- http-errors
- mongoose
- mongodb

#### Dev



### MIT © Seth Donohue