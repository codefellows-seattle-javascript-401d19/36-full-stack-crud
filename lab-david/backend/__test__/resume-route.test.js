'use strict';

require('./lib/setup');

const superagent = require('superagent');
const categoryMock = require('./lib/category-mock');
const server = require('../lib/server');

const apiURL = `http://localhost:${process.env.PORT}/api/categories`;

describe('/api/categories', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(categoryMock.remove);

  describe('POST /api/categories', () => {
    test('should respond with a category and a 200 status code if there is no error', () => {
      return superagent.post(apiURL)
        .send({
          name : 'zaphod',
          age : '30',
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('zaphod');
        });
    });

    test('should respond with a 400 code if we send an incomplete category', () => {
      let categoryToPost = {
        age : '50',
      };
      return superagent.post(`${apiURL}`)
        .send(categoryToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 409 code if we send a category with a project property, which is a unique property, that already exists', () => {
      return categoryMock.create()
        .then(category => {
          return superagent.post(apiURL)
            .send({
              project : category.project,
              name : category.name,
              age : category.age,
              _id : category._id,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  });
    

  describe('DELETE /api/categories/:id', () => {
    test('should respond with a 204 if there are no errors', () => {
      return categoryMock.create()
        .then(category => {
          return superagent.delete(`${apiURL}/${category._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with a 404 if the id is invalid', () => {
      return superagent.delete(`${apiURL}/superFakeID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/categories', () => {
    test('PUT should update category and respond with a 200 if there are no errors', () => {

      let categoryToUpdate = null;

      return categoryMock.create()
        .then(category => {
          categoryToUpdate = category;
          return superagent.put(`${apiURL}/${category._id}`)
            .send({name : 'Zaphod'});
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Zaphod');          
          expect(response.body._id).toEqual(categoryToUpdate._id.toString());
        });
    });
  });

  describe('GET /api/categories', () => {
    test('GET should respond with a 200 status code if there is no error', () => {
      let categoryToTest = null;

      return categoryMock.create()
        .then(category => {
          categoryToTest = category;
          return superagent.get(`${apiURL}/${category._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);

          expect(JSON.stringify(response.body.name))
            .toEqual(JSON.stringify(categoryToTest.name));
        });
    });
    test('should respond with a 404 status code if the id is incorrect', () => {
      return superagent.get(`${apiURL}/superFakeId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});