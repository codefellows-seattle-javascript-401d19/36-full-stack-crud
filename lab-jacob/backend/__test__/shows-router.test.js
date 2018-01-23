'use strict';

require('./lib/setup');

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');

const showsMockData = require('./lib/shows-mock');
const directorsMockData = require('./lib/directors-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/shows`;

describe('/api/shows', () => {
  beforeEach(server.start);
  afterEach(server.stop);
  afterEach(showsMockData.remove);

  describe('POST /api/shows', () => {
    test('should respond with a show and 200 status code if there is no error', () => {
      let tempDirectorMock = null;
      return directorsMockData.create()
        .then(mock => {
          tempDirectorMock = mock;

          let showToPost = {
            title : faker.lorem.words(10),
            synopsis : faker.lorem.words(100),
            director : mock._id, 
          };
          return superagent.post(`${apiURL}`)
            .send(showToPost)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body._id).toBeTruthy();
              expect(response.body.timestamp).toBeTruthy();
              expect(response.body.director).toEqual(tempDirectorMock._id.toString());

              expect(response.body.title).toEqual(showToPost.title);
              expect(response.body.synopsis).toEqual(showToPost.synopsis);
            });
        });

    });

    test('should respond with a 404 if the director id is not present', () => {
      return superagent.post(apiURL)
        .send({
          title : 'Family Guy',
          synopsis : 'This is a synopsis of many words so ...',
          director : `BAD_ID`,
        })
        .then(Promise.reject)
        .catch(response => {
          console.log(response.body);
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 400 code if we send an incomplete show', () => {
      let showToPost = {
        synopsis : faker.lorem.words(100),
      };
      return superagent.post(`${apiURL}`)
        .send(showToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

  });

  describe('DELETE /api/shows/:id', () => {
    test('should respond with a 204 if there are no errors', ()=>{
      return showsMockData.create()
        .then(mock => {
          return superagent.delete(`${apiURL}/${mock.show._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with a 404 if the id is invalid', ()=>{
      return superagent.delete(`${apiURL}/WRONG_ID_WONT_WORK`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/shows', () => {
    test('should update show and respond with 200 if there are no errors', () => {

      let noteToUpdate = null;

      return showsMockData.create()
        .then(mock => {
          noteToUpdate = mock.show;
          return superagent.put(`${apiURL}/${mock.show._id}`)
            .send({title : 'Gregor and The Hound'});
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Gregor and The Hound');
          expect(response.body.synopsis).toEqual(noteToUpdate.synopsis);
          expect(response.body._id).toEqual(noteToUpdate._id.toString());
        });
    });
  });

 //==============================================================================
 //============================================================================== 
// console.log('====================================');
// console.log(`GET BELOW MIGHT NOT WORK`);
// console.log('====================================');
//   describe('GET /api/shows/', () => {
//     test('should return 10 shows', () => {
//       return SHOWS_MOCK.createMany(100)
//         .then(tempShows => {
//           return superagent.get(`${apiURL}`);
//         })
//         .then(response => {
//           // console.log(response.headers);
//           // console.log(response.body);
//           expect(response.status).toEqual(200);
//           expect(response.body.count).toEqual(100);
//           expect(response.body.data.length).toEqual(10);
//         });
//     });
//   });

 //==============================================================================
 //==============================================================================

  describe('GET /api/shows/:id', () => {
    test('should respond with 200 status code if there is no error', () => {
      let tempMock = null;

      return showsMockData.create()
        .then(mock => {
          tempMock = mock;
          return superagent.get(`${apiURL}/${mock.show._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);

          expect(response.body._id).toEqual(tempMock.show._id.toString());
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.title).toEqual(tempMock.show.title);
          expect(response.body.synopsis).toEqual(tempMock.show.synopsis);

          expect(response.body.director._id).toEqual(tempMock.director._id.toString());
          expect(response.body.director.title).toEqual(tempMock.director.title);
          expect(JSON.stringify(response.body.director.keywords))
            .toEqual(JSON.stringify(tempMock.director.keywords));
        });
    });

    test('should respond with 404 status code if there id is incorrect', () => {
      return superagent.get(`${apiURL}/WRONG_ID_WONT_WORK`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});