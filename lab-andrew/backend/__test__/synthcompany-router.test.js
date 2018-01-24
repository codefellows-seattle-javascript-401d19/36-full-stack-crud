'use strict';

require('./lib/setup');

const server = require('../lib/server');
const superagent = require('superagent');
const faker = require('faker');
const companyMock = require('./lib/synthcompany-mock');

const PORT = process.env.PORT;

const __API_URL__ = `http://localhost:${PORT}/api/company`;

describe('/api/company', () => {
  beforeAll(server.start);
  afterEach(companyMock.remove);
  afterAll(server.stop);

  describe('POST /api/company', () => {
    test('POST should respond with 200 status code and a body if no errors', () => {
      let someCompany = {
        name : faker.lorem.words(1),
        location : faker.lorem.words(1),
        yearEstablished : faker.random.number(),
        digitalAnalogOrBoth : 'digital',
      };
      return superagent.post(`${__API_URL__}`)
        .send(someCompany)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(someCompany.name);
          expect(response.body.location).toEqual(someCompany.location);
          expect(response.body.yearEstablished).toEqual(someCompany.yearEstablished);
          expect(response.body.digitalAnalogOrBoth).toEqual('digital');
          expect(response.body._id).toBeTruthy();
        });
    });

    test('POST should respond with 400 if no body or invalid body request', () => {
      return superagent.post(`${__API_URL__}`)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('POST should respond with 409 if request duplicates unique parameter', () => {

      return companyMock.create()
        .then(company => superagent.post(`${__API_URL__}`)
          .send({
            name : company.name,
            location : company.location,
          })
          .catch(response => {
            expect(response.status).toEqual(409);
          })
        );
    });
  });

  describe('GET /api/company', () => {

    test('GET should respond with 200 status code and company if no errors when URL includes company id; checking that a known value that is expected is returned', () => {
      let companyTest = null;

      return companyMock.create()
        .then(company => {
          companyTest = company;
          return superagent.get(`${__API_URL__}/${company._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body._id).toEqual(companyTest._id.toString());
          expect(response.body.name).toEqual(companyTest.name);
          expect(response.body.location).toEqual(companyTest.location);
          expect(response.body.yearEstablished).toEqual(companyTest.yearEstablished);
          expect(response.body.digitalAnalogOrBoth).toEqual(companyTest.digitalAnalogOrBoth);
        });
    });

    test('GET should respond with 404 if the id queried does not exist', () => {
      return superagent.get(`${__API_URL__}/5a2f38171865f60a35e145ff`)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/company', () => {

    test('PUT should respond with 200 and updated company if successful', () => {
      let companyPut = {
        name : faker.lorem.words(1),
        location : faker.lorem.words(1),
        yearEstablished : faker.random.number(),
        digitalAnalogOrBoth : 'digital',
      };
      return companyMock.create()
        .then(company => {
          return superagent.put(`${__API_URL__}/${company._id}`)
            .send(companyPut)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body.name).toEqual(companyPut.name);
              expect(response.body.location).toEqual(companyPut.location);
              expect(response.body.yearEstablished).toEqual(companyPut.yearEstablished);
              expect(response.body.digitalAnalogOrBoth).toEqual('digital');
            });
        });
    });

    test('PUT should respond with 400 if no body or invalid body request', () => {
      return companyMock.create()
        .then(company => superagent.put(`${__API_URL__}/${company._id}`))
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('PUT should respond with 404 if invalid id provided', () => {
      let companyPut = {
        name : faker.lorem.words(1),
        location : faker.lorem.words(1),
        yearEstablished : faker.random.number(),
        digitalAnalogOrBoth : 'digital',
      };
      return superagent.put(`${__API_URL__}/5a2f38171865f60a35e145ff`)
        .send(companyPut)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('PUT should respond with 409 if request duplicates unique parameter', () => {
      let dupName = null;
      return companyMock.create()
        .then(company => {
          dupName = company.name;
          return companyMock.create()
            .then(company => superagent.put(`${__API_URL__}/${company._id}`)
              .send({
                name : dupName,
                location : faker.lorem.words(1),
              })
              .catch(response => {
                expect(response.status).toEqual(409);
              })
            );
        });
    });
  });

  describe('DELETE /api/company', () => {

    test('DELETE should respond with a 404 message if invalid id provided', () => {
      return superagent.delete(`${__API_URL__}/5a2f38171865f60a35e145ff`)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('DELETE should respond with a 204 message if successful', () => {
      return companyMock.create()
        .then(company => {
          return superagent.delete(`${__API_URL__}/${company._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });
  });
});
