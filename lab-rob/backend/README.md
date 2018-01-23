# Code Fellows: Code 401d19: Full-Stack JavaScript

## Lab 36: Full Stack Crud

This is the backend RESTful API to the budget calculator app, which handles all data persistence.

## Tech/frameworks/packages

- node 
- npm
- node packages
  - jest
  - eslint 
  - superagent
  - express
  - mongoose
  - dotenv
  - faker
  - winston
  - mongoose
  - http-errors
- mongodb

## How to use?
Clone this repo, `cd` into `lab-rob/backend`, run `npm install`. 

Touch `.env` in `lab-rob` and add `PORT=3000` and `MONGODB_URI=mongodb://localhost/<desired database name>`.

Run `npm run watch` to start the server with nodemon.

Make sure you have MongoDb installed (`brew install mongo`), and then run `npm run dbon` to start the database.

Start the front end and make POST/GET/DELETE/PUT requests to the server to interact with the database.

When finished, run `npm run dboff` to terminate the database.

## Routes

### Categories

#### `POST /api/categories`

Requires `name` and `budget`.

#### `GET /api/categories`

Returns all categories (name, budget, timestamp, id)

#### `GET /api/categories/<category id>`

Return a specific category as requested by the <category id>.

#### `DELETE /api/categories/<category id>`

Delete a specific category as requested by the <category id>. If successful, a 204 code is sent.

If a category has linked expenses, all linked expenses are also removed.

If a category with that id is not found, a 404 is returned.

#### `DELETE /api/categories`

Delete all categories and expenses. If successful, a 204 code is sent.

#### `PUT /api/categories/<category id>`

Update a specific category's properties by id. You can only change the original properties listed in the POST notes above.

If successful, the new category is returned with a 200 status.

If a category with that id is not found, a 404 status is returned.


### Expenses

#### `POST /api/expenses`

Requires `name` and `price`.

Throws an error if any of the required properties are missing.

Adds a new expense to the database and establishes a connection to the specified category. Returns the added expense object with `timestamp` and `id` properties.

#### `GET /api/expenses/<expense id>`

Return a specific expense as requested by the <expense id>.

If a expense with that id is not found, a 404 is returned.

#### `DELETE /api/expense/<expense id>`

Delete a specific expense as requested by the <expense id>. If successful, a 204 code is sent. The expense is also removed from the `expenses` array in the `category` document that it is linked to.

If a expense with that id is not found, a 404 is returned.

#### `DELETE /api/expense?category=<category id>`

Delete all expenses for a specific category, specified by the <category id>. If successful, a 204 code is sent.

If a category with that id is not found, a 404 is returned.

#### `PUT /api/expenses/<expense id>`

Update a specific expense's properties by id. You can only change the original properties listed in the POST notes above.

If successful, the new expense is returned with a 200 status.

If an expense with that id is not found, a 404 status is returned.

## Modules

### `error-middleware.js`

Exports a single function of arity four. Takes in `error`, `request`, `response`, and `next`. This function handles all error logging and status messages, and should be required into an `app.use` call after the catch all route in `server.js`.

### `logger-middleware.js`

Exports a single function of arity three. Takes in `request`, `response`, and `next`. This function handles all information logging, and should be required into an `app.use` call before hitting the routes `app.use` call.

### `logger.js`

Exports an instance of a Winston logger that should be used for all info and error logging.

### `server.js`

Exports an object with two methods, `start()` and `stop`. Both have an arity of zero and return promises.

### `category.js`

Exports a mongoose model for a category. Schema is as follows:

    `name: String` (required)
    `budget: Number` (required)
    `timestamp` (auto generated)
    `expenses` (auto generated)
    `_id` (auto generated)


### `category-router.js`

Exports an instance of a new `Express` Router object specifying routes for all category related HTTP requests. 

Should be required into server.js `app.use`.

### `expense.js`

Exports a mongoose model for an expense. Schema is as follows:

    `name: String` (required)
    `price: Number` (required)
    `category` Show ObjectId (required)
    `timestamp` (auto generated)
    `_id` (auto generated)

### `expense-router.js`

Exports an instance of a new `Express` Router object specifying routes for all expense related HTTP requests. 

Should be required into server.js `app.use`.

### `index.js`

When executed, starts the server.

### expense-mock.js

Exports an object with three methods.

1. `expenseMock.create()` has an arity of zero and adds a mock category and expense to the database.
1. `expenseMock.createMany(number)` has an arity of one and adds a mock category and a given number of mock expenses to the database.
1. `expenseMock.remove()` has an arity of zero and removes all expenses from the database and the mock category.

### category-mock.js

Exports an object with two methods.

1. `categoryMock.create()` has an arity of zero and adds a mock category to the database.
1. `expenseMock.createMany(number)` has an arity of one and adds a mock category and a given number of mock expenses to the database.
1. `categoryMock.remove()` has an arity of zero and removes all categories from the database.

### setup.js

When required into the test files, environment variables are established.

## Tests

run `npm test` to check all tests. Test data saved to `testing` collection.

## Contribute

You can totally contribute to this project if you want. Fork the repo, make some cool changes and then submit a PR.

## License

MIT. Use it up!