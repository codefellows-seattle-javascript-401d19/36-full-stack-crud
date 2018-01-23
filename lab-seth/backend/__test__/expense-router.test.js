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
  afterEach(expenseMock.remove);

  describe('POST /api/expenses', () => {
    test('This POST should respond with a expense and 200 status if no error', () => {
      let tempcategoryMock = null;
      return categoryMock.create()
        .then(mock => {
          tempcategoryMock = mock;

          let expenseToPost = {
            name: `KP-${faker.random.number(10)}-${
              faker.random.alphaNumeric(10)}`,
            content: 'CONTENT_FILLER',
            category: mock._id,
          };
          return superagent.post(apiURL)
            .send(expenseToPost)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body._id).toBeTruthy();
              
              expect(response.body.name).toEqual(expenseToPost.name);
              expect(response.body.content).toEqual(expenseToPost.content);
              expect(response.body.category).toEqual(tempcategoryMock._id.toString());
            });
        });
    });

    test('This POST should respond with a 404 if the category id is not input', () => {
      return superagent.post(apiURL)
        .send({
          name: `KP-${faker.random.number(10)}-${
            faker.random.alphaNumeric(10)}`,
          content: 'CONTENT_FILLER',
          category: 'FALSE_ID',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('This POST should respond with a 400 code if we send an incomplete expense', () => {
      let expenseToPost = {
        content: 'CONTENT_FILLER',
      };
      return superagent.post(`${apiURL}`)
        .send(expenseToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

  });

  describe('GET /api/expenses/:id', () => {
    test('This GET should respond with 200 status code if there is no error', () => {
      let tempMock = null;

      return expenseMock.create()
        .then(mock => {
          tempMock = mock;
          return superagent.get(`${apiURL}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body._id).toEqual(tempMock.expense._id.toString());
          expect(response.body.category).toBeTruthy();
          expect(response.body.name).toEqual(tempMock.expense.name);
          expect(response.body.content).toEqual(tempMock.expense.content);
          
          expect(response.body.category._id).toEqual(tempMock.category._id.toString());
          expect(response.body.category.name).toEqual(tempMock.category.name);
        });
    });

    test('This GET should respond with 404 status code if the id is incorrect', () => {
      return superagent.get(`${apiURL}/FALSE_ID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/expenses', () => {
    test('This PUT should update expense and respond with 200 if there are no errors', () => {

      let expenseToUpdate = null;

      return expenseMock.create()
        .then(mock => {
          expenseToUpdate = mock.expense;
          return superagent.put(`${apiURL}/${mock.expense._id}`)
            .send({ name: 'KP-123asd' });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('KP-123asd');
          expect(response.body.content).toEqual(expenseToUpdate.content);
        });
    });
    
    test('This PUT should respond with 404 if the id is incorrect', () => {

      return expenseMock.create()
        .then(() => {
          return superagent.put(`${apiURL}/FALSE_ID`)
            .send({ name: 'KP-123asd' });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/expenses/:id', () => {
    test('This DELETE should respond with a 204 if there are no errors', () => {
      return expenseMock.create()
        .then(mock => {
          return superagent.delete(`${apiURL}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('This DELETE should respond with a 404 if the id is invalid', () => {
      return superagent.delete(`${apiURL}/FALSE_ID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});