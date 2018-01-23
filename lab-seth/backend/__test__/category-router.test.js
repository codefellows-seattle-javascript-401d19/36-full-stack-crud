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
    test('This POST should return a 200 and a category if there are no errors', () => {
      return superagent.post(apiURL)
        .send({
          name: 'SampleBudget',
          budget: 999,
          period: 'month',
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.budget).toEqual(3);
        });
    });

    test('This POST should return a 409 due to a duplicate name', () => {
      return categoryMock.create()
        .then(category => {
          return superagent.post(apiURL)
            .send({
              name: category.name,
              budget: 4,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });

  //TODO: ADD 400 TEST
  //TODO: ADD 404 TEST

  });

  describe('GET /api/categories/:id', () => {
    test('This GET should respond with a 200 status and a category if there are no errors', () => {
      let tempcategoryMock = null;

      return categoryMock.create()
        .then(category => {
          tempcategoryMock = category;
          return superagent.get(`${apiURL}/${category.id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(JSON.stringify(response.body.budget))
            .toEqual(JSON.stringify(tempcategoryMock.budget));
        });
    });

    //TODO: ADD 400 TEST
    //TODO: ADD 404 TEST
    //TODO: ADD 409 TEST

  });


  //TODO: ADD ENTIRE PUT TEST

  describe('PUT /api/categories/', () => {
    test('This PUT should respond with a 200 status if there are no errors', () => {

      return categoryMock.create()
        .then(category => {
          console.log(category._id);
          return superagent.put(`${apiURL}/${category._id}`)
            .send({ budget: 6 });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.budget).toEqual(6);
        });
    });
    //TODO: ADD 400 TEST
    // test('This PUT should')
      
    

  //TODO: ADD 404 TEST
  //TODO: ADD 409 TEST
  });




  //TODO: ADD ENTIRE DELETE TEST
  //TODO: ADD 200 TEST
  //TODO: ADD 400 TEST
  //TODO: ADD 404 TEST
  //TODO: ADD 409 TEST



});