'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const categoryMock = require('./lib/category-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/categorys`;

describe('/api/categorys', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(categoryMock.remove);

  describe('POST /api/categorys`', () => {
    test('should return a 200 and a category if there are no errors', () => {
      return superagent.post(apiURL)
        .send({
          name: 'testing',
          budget: 10,
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('testing');
          expect(response.body.budget).toEqual(10);
        });
    });

    test('should return a 400 and a category if request is bad', () => {
      return superagent.post(apiURL)
        .send({
          name: 'testing',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should return a 409 due to a duplicate name clash', () => {
      return categoryMock.create()
        .then(category => {
          return superagent.post(apiURL)
            .send({
              name: category.name,
              budget: 10,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  });

  describe('GET /api/categorys/:id', () => {
    test('should respond with a 200 status and a category if there are no errors', () => {
      let tempCategoryMock = null;

      return categoryMock.create()
        .then(category => {
          tempCategoryMock = category;
          return superagent.get(`${apiURL}/${category._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(JSON.stringify(response.body.name))
            .toEqual(JSON.stringify(tempCategoryMock.name));
        });
    });

    test('should respond with a 404 status if category id is not found', () => {
      return superagent.get(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/categorys/:id', () => {
    test('should respond with a 204 status and removed category if there are no errors', () => {
      return categoryMock.create()
        .then(category => {
          return superagent.delete(`${apiURL}/${category._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with a 404 status if category id is not found', () => {
      return superagent.delete(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});
