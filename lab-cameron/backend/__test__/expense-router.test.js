'use strict';

require('./lib/setup');

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');

const expenseMock = require('./lib/expense-mock');
const categoryMock = require('./lib/category-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/expenses`;

describe('/api/expenses', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(() => expenseMock.remove({}));

  describe('POST /api/expenses', () => {
    test('should respond with an expense and 200 status code if there is no error',  () => {
      let tempCategoryMock = null;
      return categoryMock.create()
        .then(mock => {
          tempCategoryMock = mock;

          const expenseToPost = {
            name: 'test',
            price: 10,
            uuid: 'test description',
            categoryId: mock._id,
          };
          return superagent.post(`${apiURL}`)
            .send(expenseToPost)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body._id).toBeTruthy();
              expect(response.body.timestamp).toBeTruthy();
              expect(response.body.categoryId).toEqual(tempCategoryMock._id.toString());

              expect(response.body.name).toEqual(expenseToPost.name);
              expect(response.body.price).toEqual(expenseToPost.price);
              expect(response.body.uuid).toEqual(expenseToPost.uuid);
            });
        });
    });

    test('should respond with a 400 code if we send an incomplete expense', () => {
      const expenseToPost = {
        name: faker.lorem.words(1),
        price: faker.random.number(1),
      };
      return superagent.post(`${apiURL}`)
        .send(expenseToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 404 code if category id is not present', () => {
      // hard coded values into send; faker taking too long
      return superagent.post(`${apiURL}`)
        .send({
          name: 'testing',
          price: 10,
          uuid: 'testing description',
          categoryId: 'invalidId',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 409 status code if there is a unique key clash',  () => {
      return categoryMock.create()
        .then(mock => {
          const expenseToPost = {
            name: 'test',
            price: 10,
            uuid: 'test description',
            categoryId: mock._id,
          };
          return superagent.post(`${apiURL}`)
            .send(expenseToPost)
            .then(() => {
              return superagent.post(`${apiURL}`)
                .send(expenseToPost)
                .then(Promise.reject)
                .catch(response => {
                  console.log(response);
                  expect(response.status).toEqual(409);
                });
            });
        });
    });
  });

  describe('PUT /api/expenses/:id', () => {
    test('should respond with a 200 status code and an updated expense if expense exists', () => {
      let expenseToUpdate = null;

      return expenseMock.create()
        .then(mock => {
          expenseToUpdate = mock.expense;
          return superagent.put(`${apiURL}/${mock.expense._id}`)
            .send({
              name: 'testing',
              price: 100,
              uuid: 'testing',
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('testing');
          expect(response.body.price).toEqual(100);
          expect(response.body.uuid).toEqual('testing');
          expect(response.body._id).toEqual(expenseToUpdate._id.toString());
        });
    });

    test('should respond with a 404 status code if id is not found', () => {
      return superagent.put(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 409 status code if there is a unique key clash', () => {
      let duplicateExpense = null;
      let expenseToPost = null;

      return expenseMock.create()
        .then(mock => {
          expenseToPost = mock.expense;
          return expenseMock.create()
            .then(mock => {
              duplicateExpense = mock.expense;
              return superagent.put(`${apiURL}/${expenseToPost._id}`)
                .send({ uuid: duplicateExpense.uuid })
                .then(Promise.reject)
                .catch(response => {
                  expect(response.status).toEqual(409);
                });
            });
        });
    });
  });

  describe('GET /api/expenses', () => {
    test('should respond with a 200 status code and a single expense if expense exists', () => {
      let expenseToTest = null;

      return expenseMock.create()
        .then(mock => {
          expenseToTest = mock.expense;
          return superagent.get(`${apiURL}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(expenseToTest.name);
          expect(response.body.price).toEqual(expenseToTest.price);
          expect(response.body.uuid).toEqual(expenseToTest.uuid);
          expect(response.body._id).toEqual(expenseToTest._id.toString());
        });
    });

    test('should respond with a 200 status code and all students if no id is provided', () => {
      const expenseArrayToTest = [];

      return expenseMock.create()
        .then(mock=> {
          expenseArrayToTest.push(mock.expense);
          return expenseMock.create();
        })
        .then(mock => {
          expenseArrayToTest.push(mock.expense);
          return expenseMock.create();
        })
        .then(mock => {
          expenseArrayToTest.push(mock.expense);
          return superagent.get(`${apiURL}`)
            .then(response => {
              expect(response.status).toEqual(200);

              expect(response.body[0].name).toEqual(expenseArrayToTest[0].name);
              expect(response.body[0].price).toEqual(expenseArrayToTest[0].price);
              expect(response.body[0].uuid).toEqual(expenseArrayToTest[0].uuid);
              expect(response.body[0]._id).toEqual(expenseArrayToTest[0]._id.toString());

              expect(response.body[1].name).toEqual(expenseArrayToTest[1].name);
              expect(response.body[1].price).toEqual(expenseArrayToTest[1].price);
              expect(response.body[1].uuid).toEqual(expenseArrayToTest[1].uuid);
              expect(response.body[1]._id).toEqual(expenseArrayToTest[1]._id.toString());

              expect(response.body[2].name).toEqual(expenseArrayToTest[2].name);
              expect(response.body[2].price).toEqual(expenseArrayToTest[2].price);
              expect(response.body[2].uuid).toEqual(expenseArrayToTest[2].uuid);
              expect(response.body[2]._id).toEqual(expenseArrayToTest[2]._id.toString());
            });
        });
    });

    test('should respond with a 404 if invalid route is provided', () => {
      return superagent.get(`http://localhost:${process.env.PORT}/invalid/route`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with 404 status code if the id is incorrect', () => {
      return superagent.get(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/expenses/:id', () => {
    test('should delete a single expense if valid id is provided', () => {
      return expenseMock.create()
        .then(mock => {
          return superagent.delete(`${apiURL}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with 404 status code if id does not exist', () => {
      return superagent.delete(`${apiURL}/nonexistentId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/expenses/', () => {
    test('should respond with 400 status code if no id is provided', () => {
      return superagent.delete(`${apiURL}`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });
});
