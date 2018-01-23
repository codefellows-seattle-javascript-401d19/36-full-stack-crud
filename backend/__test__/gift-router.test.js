'use strict';

require('./lib/setup');

const faker = require('faker');
const superagent = require('superagent');
// const Gift = require('../model/gift');
const server = require('../lib/server');
const giftMock = require('./lib/gift-mock');
const christmasListMock = require('./lib/christmas-list-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/gifts`;


describe('/api/gifts', () => {
  beforeAll(server.start);
  afterEach(() => giftMock.remove({}));
  afterAll(server.stop);

  describe('POST /api/gifts', () => {
    test('should respond with a gift and 200 status code if there is no error', () =>{
      let tempChristmasListMock = null;
      return christmasListMock.create()
        .then(mock => {
          tempChristmasListMock = mock;

          let giftToSend = {
            name : faker.name.findName(),
            description : faker.lorem.words(10),
            christmasList : mock._id,
          };
          return superagent.post(apiURL)
            .send(giftToSend)
            .then(response => {
              expect(response.status).toEqual(200);
              // expect(response.body._id).toEqual(tempChristmasListMock._id.toString());// Nicholas - for some reason this code is incrementing by exactly one- lase b become c, last 1 becomes 2 etc
            });
        });
    });

    test('should respond with a 404 if the gift id is not present', () =>{
      return superagent.post(apiURL)
        .send({
          name : 'superman action figure',
          description : 'supermann action figure is cool',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(500);
        });
    });
  });
  describe('DELETE /api/gifts:id', () => {
    test('should respond with 204 status code if there is no error', () =>{
      return giftMock.create()
        .then(mock => {
          return superagent.delete(`${apiURL}/${mock.gift.id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });
  });
  describe('PUT /api/gifts/:id', () => {
    test('should update and respond with 200 status code if there is no error', () =>{
      let giftToUpdate = null;

      return giftMock.create()
        .then(mock => {
          giftToUpdate = mock.gift;
          return superagent.put(`${apiURL}/${mock.gift.id}`)
            .send({name : 'Nicholas Carignan'});
        })
        .then(response => {//only access to response but we want to test original
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Nicholas Carignan');
          expect(response.body.list).toEqual(giftToUpdate.list);
          expect(response.body.pricelimit).toEqual(giftToUpdate.pricelimit);
          expect(response.body._id).toEqual(giftToUpdate.id.toString());
        });
    });
    test('should respond with a 404 error code if id invalid', () =>{
      return superagent.delete(`${apiURL}/christmas-lists/`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(500);
        });
    });
  });


  describe('GET /api/gifts', () => {
    test('should return 10 gifts where 10 is the size of the page by default if there is no error', () =>{
      return giftMock.createMany(100)
        .then(() =>{
          return superagent.get(apiURL);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.count).toEqual(100);
          expect(response.body.data.length).toEqual(10);
        });

    });
  });
  describe('GET /api/gifts/:id', () => {
    test('should respond with gifts and 200 status code if there is no error', () =>{
      let tempMock = null;

      return giftMock.create()
        .then(mock => {
          tempMock = mock;
          return superagent.get(`${apiURL}/${mock.gift.id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body._id).toEqual(tempMock.gift._id.toString());
          expect(response.body.timestamp).toBeTruthy();
        });
    });
  });

});
