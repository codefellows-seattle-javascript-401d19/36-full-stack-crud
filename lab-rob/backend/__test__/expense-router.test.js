'use strict';

require('./lib/setup');
const expenseMock = require('./lib/expense-mock');
const categoryMock = require('./lib/category-mock');
const server = require('../lib/server');
const superagent = require('superagent');
const __API_URL__ = `http://localhost:${process.env.PORT}/api/expenses`;

describe('expense-router.js', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(expenseMock.remove);

  describe('POST /api/expenses', () => {
    test('should respond with a 200 status code and the sent object if no errors.', () => {
      let myExpense = {
        name: 'Expense 1',
        price: 10,
      };

      return categoryMock.create()
        .then(category => {
          myExpense.category = category._id;
          return superagent.post(__API_URL__)
            .send(myExpense);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.expense.name).toEqual(myExpense.name);
          expect(response.body.expense.price).toEqual(myExpense.price);
          expect(response.body.expense.timestamp).toBeTruthy();
          expect(response.body.expense.id).toBeTruthy();
          expect(response.body.expense.categoryId).toEqual(myExpense.category.toString());
        });
    });

    test('should respond with a 400 status if missing expense name.', () => {
      let myIncompleteEpisode = {
        price: 10,
      };

      return categoryMock.create()
        .then(category => {
          myIncompleteEpisode.category = category._id;
          return superagent.post(__API_URL__)
            .send(myIncompleteEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 400 status if missing expense price.', () => {
      let myIncompleteEpisode = {
        name: 'Shmoopy Schmaaapy',
      };

      return categoryMock.create()
        .then(category => {
          myIncompleteEpisode.category = category._id;
          return superagent.post(__API_URL__)
            .send(myIncompleteEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 400 status if missing category id.', () => {
      let myIncompleteEpisode = {
        name: 'Shmoopy Schmaaapy',
        price: 10,
      };

      return categoryMock.create()
        .then(() => {
          return superagent.post(__API_URL__)
            .send(myIncompleteEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 404 status if an incorrect category id is used.', () => {
      let myAwkwardEpisode = {
        name: 'Shmoopy Schmaaapy',
        price: 1,
      };

      return categoryMock.create()
        .then(category => {
          myAwkwardEpisode.category = category._id;
          return categoryMock.remove();
        })
        .then(() => {
          return superagent.post(__API_URL__)
            .send(myAwkwardEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  }); 

  describe('GET /api/expenses/:id', () => {
    test('should respond with a 200 status code and the requested object.', () => {
      let myMock;
      return expenseMock.create()
        .then(mock => {
          myMock = mock;
          return superagent.get(`${__API_URL__}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.expense.name).toEqual(myMock.expense.name);
          expect(response.body.expense.price).toEqual(myMock.expense.price);
          expect(response.body.expense.timestamp).toBeTruthy();
          expect(response.body.expense.id).toBeTruthy();
          expect(response.body.expense.categoryId).toEqual(myMock.expense.category.toString());
        });
    });

    test('should respond with a 404 status code if id is not in database.', () => {
      return expenseMock.create()
        .then(() => {
          return superagent.get(`${__API_URL__}/no-thanks-boss`);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/expenses/:id', () => {
    test('should respond with a 204 when removing an expense successfully.', () => {
      return expenseMock.create()
        .then(mock => {
          return superagent.delete(`${__API_URL__}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });
    
    test('should respond with a 404 when id is not found.', () => {
      return superagent.delete(`${__API_URL__}/fakey-mcfake-fake`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/expenses/:id', () => {
    test('should respond with a 200 and updated document if no errors.', () => {
      let myExpense;
      return expenseMock.create()
        .then(mock => {
          myExpense = mock.expense;
          return superagent.put(`${__API_URL__}/${mock.expense._id}`)
            .send({
              name: 'Cool Expense',
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.expense.name).toEqual('Cool Expense');
          expect(response.body.expense.price).toEqual(myExpense.price);
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