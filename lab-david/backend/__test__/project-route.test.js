'use strict';

require('./lib/setup');

const superagent = require('superagent');
const faker = require('faker');
const server = require('../lib/server');

const expenseMock = require('./lib/expense-mock');
const categoryMock = require('./lib/category-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/expenses`;

describe('/api/expenses', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(expenseMock.remove);

  describe('POST /api/expenses', () => {
    test('should respond with a expense and a 200 status code if there is no error', () => {
      let tempCategoryMock = null;
      return categoryMock.create()
        .then(mock => {
          tempCategoryMock = mock;

          let expenseToPost = {
            title : faker.company.bsNoun(2),
            year : 2017,
            languages : faker.database.engine(3).split(' '),
            description : faker.company.catchPhrase(10).split(' '),
            category : mock._id,
          };
          return superagent.post(`${apiURL}`)
            .send(expenseToPost)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body._id).toBeTruthy();
              expect(response.body.name).toEqual(expenseToPost.name);
              expect(response.body.year).toEqual(expenseToPost.year);
            });
        });
    });

    test('should respond with a 404 if the category id is not present', () => {
      return superagent.post(apiURL)
        .send({
          title : 'Awesome Expense',
          year : '2017',
          languages : 'CSS',
          description : faker.company.catchPhrase(10).split(' '),
          category : 'FAKE_ID',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 400 code if we send an incomplete expense', () => {
      let expenseToPost = {
        title : faker.lorem.words(2),
        year : faker.date.soon,        
      };
      return superagent.post(`${apiURL}`)
        .send(expenseToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });

  describe('DELETE /api/expenses/:id', () => {
    test('should respond with a 204 if there are no errors', () => {
      return expenseMock.create()
        .then(mock => {
          return superagent.delete(`${apiURL}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with a 404 if the id is invalid', () => {
      return superagent.delete(`${apiURL}/SuperFakeID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('GET /api/expenses/:id', () => {
    test('should respond with a 200 status if there is no error', () => {
      
      let tempMock = null;

      return expenseMock.create()
        .then(mock => {
          tempMock = mock;
          return superagent.get(`${apiURL}/${mock.expense._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);

          expect(response.body._id).toEqual(tempMock.expense._id.toString());

          expect(response.body.name).toEqual(tempMock.expense.name);
          expect(response.body.year).toEqual(tempMock.expense.year);

          expect(response.body.category._id).toEqual(tempMock.category._id.toString());
          expect(response.body.category.age).toEqual(tempMock.category.age);
          expect(JSON.stringify(response.body.category.languages)).toEqual(JSON.stringify(tempMock.category.languages));
        });
    });
    test('should respond with a 404 status code if the id is incorrect', () => {
      return superagent.get(`${apiURL}/SuperFakeID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});