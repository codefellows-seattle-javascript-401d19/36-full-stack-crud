'use strict';

require('./lib/setup');
const server = require('../lib/server');
const superagent = require('superagent');
const categoryMock = require('./lib/category-mock');
const expenseMock = require('./lib/expense-mock');
const Expense = require('../model/expense');

const __API_URL__ = `http://localhost:${process.env.PORT}/api/categories`;

describe('category-router.js', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(categoryMock.remove);

  describe('POST /api/categories', () => {
    test('should respond with a 200 status and the sent object when successful.', () => {
      return superagent.post(__API_URL__)
        .send({
          name: 'Category 1',
          budget: 500,
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Category 1');
          expect(response.body.budget).toEqual(500);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();
        });
    });

    test('should respond with a 400 status if schema validation fails, for example a missing title.', () => {
      return superagent.post(__API_URL__)
        .send({
          budget: 500,
        })
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });

  describe('GET /api/categories/:id', () => {
    test('should respond with a 200 status and the requested object.', () => {
      let myCategory;
      return categoryMock.create()
        .then(category => {
          myCategory = category;
          return superagent.get(`${__API_URL__}/${category._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.category.name).toEqual(myCategory.name);
          expect(response.body.category.budget).toEqual(myCategory.budget);
          expect(response.body.category._id).toEqual(myCategory._id.toString());
        });
    });

    test('should respond with a 404 status if a category with the given id is not found.', () => {
      return superagent.get(`${__API_URL__}/fake-path`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('GET /api/categories', () => {
    test('should respond with an array of objects and a 200 status.', () => {
      return categoryMock.createMany(100)
        .then(() => {
          return superagent.get(`${__API_URL__}`)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body.categories.length).toEqual(100);
            });
        });
    });
  });

  describe('DELETE /api/categories/:id', () => {
    test('should respond with a 204 status if category is deleted.', () => {
      return categoryMock.create()
        .then(category => {
          return superagent.delete(`${__API_URL__}/${category._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should also delete any linked expenses upon success.', () => {
      let expenseId, categoryId;
      return expenseMock.create()
        .then(mock => {
          expenseId = mock.expense._id;
          categoryId = mock.category._id;
          
          return Expense.findById(expenseId);
        })
        .then(expense => {
          expect(expense).toBeTruthy();
          return superagent.delete(`${__API_URL__}/${categoryId}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
          return Expense.findById(expenseId);
        })
        .then(expense => {
          expect(expense).toBeFalsy();
        });
    });

    test('should respond with a 404 status if a category with the given id is not found.', () => {
      return superagent.delete(`${__API_URL__}/fake-path`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/categories/:id', () => {
    test('should respond with a 200 and updated document if no errors.', () => {
      let myCategory;
      return categoryMock.create()
        .then(category => {
          myCategory = category;
          return superagent.put(`${__API_URL__}/${category._id}`)
            .send({
              name: 'Frank the Bunny',
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.category.name).toEqual('Frank the Bunny');
          expect(response.body.category.budget).toEqual(myCategory.budget);
        });
    });

    test('should respond with a 404 if a bad id is requested.', () => {
      return superagent.put(`${__API_URL__}/fake-path`)
        .send({
          name: 'fake stuff',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 400 if no body sent.', () => {
      return superagent.put(`${__API_URL__}/123`)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });
});