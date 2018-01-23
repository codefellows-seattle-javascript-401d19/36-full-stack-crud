# Code Fellows: Seattle 401 JavaScript - 401d19

## Lab 36: Budget Tracker

### Author: 
Catherine Looper

### Motivation

In this project, I built a frontend Continent/Forest Tracker application. To create a new continent item, users can enter a continent name and a population and click `create continent`. Users can update a continent item by double-clicking on the continent that they would like to update. Users also have the ability to remove any of their created continent items by clicking the `X` button next to the continent item they would like to remove. 

Users can also add forests to each continent by entering a forest `name` and `location` and clicking the `create forest` button. Users can edit information by double-clicking on the forest they want to update, and can click `X` to remove the forest from the continent.

In this application, I configured webpack to compile JavaScript and SASS into a bundle and configured babel to transpile JSX and ES6 to ES5 JavaScript. I was able to create and render React components to the DOM, add event listeners to React components, and update React component state.

This lab is using MongoDB for persistence.

### Limitations

To use this app - it is assumed that the user has familiarity with the tech and frameworks listed below.

### Code Style

Standard JavaScript with ES6, SASS, CSS, HTML, React

### Tech/Framework Used

* babel-core
* babel-loader
* babel-plugin-transform-object-rest-spread
* babel-preset-env
* babel-preset-react
* css-loader
* eslint-plugin-react
* extract-text-webpack-plugin
* html-webpack-plugin
* node-sass
* react
* react-dom
* react-redux
* react-router-dom
* redux
* redux-devtools-extension
* redux-thunk
* resolve-url-loader
* sass-loader
* style-loader
* superagent
* uuid
* webpack
* webpack-dev-server
* eslint

### How to use?

* Step 1. Fork and Clone the Repository.
* Step 2. `npm install`
* Step 3. `npm run watch`
* Step 4. You should now be able to visit: `http://localhost:8080/` to view the application
* Step 5. To create a new continent item, enter a name and a population and click the `create continent` button. 
* Step 6. Continents can be edited by double-clicking on the continent to be edited. 
* Step 7. Continent items can be removed by clicking the corresponding `X` button.
* Step 8. To create a new forest item, enter a name and a location and click the `create forest` button. Forests can be updated by double-clicking, updating, and clicking `update forest` or they can be deleted by clicking `X`.

### Credits

* Code Fellows

### License

MIT © Catherine Looper

