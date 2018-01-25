'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const categoryMock = require('./lib/category-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/categories`;

describe('/api/categories', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(categoryMock.remove);

  describe('POST /api/categories', () => {
    test('POST - should respond with a 200 status code if there is no error', () => {
      return superagent.post(`${apiURL}`)
        .send({
          name: 'Randonneur',
          budget: ['Fleche', 'Brevet', 'Slow and steady'],
        })
        .then(response => {
          console.log(response.body);
          expect(response.status).toEqual(200);
          expect(response.body.tags).toEqual(['Fleche', 'Brevet', 'Slow and steady']);
        });
    });
 

    test('POST - should respond with a 400 status code if the category is incomplete', () => {
      let categoryToPost = {
        expenses: ['Lars Boom', 'Lars Van der Haar', 'Zdenek Stybar'],
      };
      return superagent.post(`${apiURL}`)
        .send(categoryToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
 


    test('POST - should respond with a 409 status code if the category is a duplicate', () => {
      return disciplineMock.create()
        .then(discipline => {
          console.log(discipline);
          return superagent.post(`${apiURL}`)
            .send({
              name: discipline.name,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          console.log(response);  
          expect(response.status).toEqual(409);
        });
    });
  });

 

  describe('GET /api/categories/:id', () => {
    test('GET - should respond with a 200 status code if there is no error', () => {
      let tempDisciplineMock;

      return disciplineMock.create()
        .then(discipline => {
          tempDisciplineMock = discipline;
          return superagent.get(`${apiURL}/${discipline._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(JSON.stringify(response.body.cyclists)).toEqual(JSON.stringify(tempDisciplineMock.cyclists));
        });
    });
  });
});
