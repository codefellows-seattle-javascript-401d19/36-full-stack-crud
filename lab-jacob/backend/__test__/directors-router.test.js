'use strict';

require('./lib/setup');

const faker = require('faker');
const superagent = require('superagent');
const directorsModel = require('../model/directors');
const directorMockData = require(`./lib/directors-mock`);
const server = require('../lib/server');

const apiURL = `http://localhost:${process.env.PORT}/api/directors`;

describe('/api/directors', () => {
  beforeEach(server.start);
  afterEach(server.stop);
  afterEach(() => directorsModel.remove({}));

  describe('POST /api/directors', () => {
    test('Should respond with a Director and 200 status code if there is no error', () => {
      let directorToPost = {
        name : `Seth MacFarlane`,
        age : 44,
        shows : faker.lorem.words(50),
      };
      return superagent.post(`${apiURL}`)
        .send(directorToPost)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.name).toEqual(directorToPost.name);
          expect(response.body.age).toEqual(directorToPost.age);
          expect(response.body.shows).toEqual(directorToPost.shows);
        });
    });
 
    test('should respond with a 400 code if we send an incomplete Director', () => {
      
      let directorToPost = {
        shows : faker.lorem.words(100),
      };
      return superagent.post(`${apiURL}`)
        .send(directorToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should return a 409 due to a duplicate title', () => {
      return directorMockData.create()
        .then(director => {
          return superagent.post(apiURL)
            .send({
              name : director.name,
              age : director.age, 
              show : director.shows,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });

  });

  describe('PUT /api/directors', () => {
    test('should update note and respond with 200 if there are no errors', () => {

      let directorToUpdate = null;
      return directorMockData.create()

        .then(director => {
          directorToUpdate = director;
          return superagent.put(`${apiURL}/${director._id}`)
            .send({name : 'David Lynch'});
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('David Lynch');
          expect(Array.isArray(response.body.shows)).toEqual(Array.isArray(directorToUpdate.shows));
          expect(response.body._id).toEqual(directorToUpdate._id.toString());
        });
    });
  });

  describe('GET /api/directors', () => {
    test('Should respond with 200 status code if there is no error', () => {
      let episodeToTest = null;
      return directorMockData.create()

        .then(Episode => {
          episodeToTest = Episode;
          return superagent.get(`${apiURL}/${Episode._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);

          expect(response.body._id).toEqual(episodeToTest._id.toString());
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.name).toEqual(episodeToTest.name);
          expect(Array.isArray(response.body.shows)).toEqual(Array.isArray(episodeToTest.shows));
        });
    });
  
    test('Should respond with 404 status code if the ID is incorrect', () => {
      return superagent.get(`${apiURL}/WRONG_ID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('GET ALL /api/directors', () => {
    test('Should respond with 200 status code if there is no error', () => {
      return directorMockData.create()

        .then( () => {
          return superagent.get(`${apiURL}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body).toBeTruthy();
        });
    });
  });


  describe('DELETE /api/directors', () =>{
    
    test('should response with 204 code if there is no error', () => {   
      return directorMockData.create()
        .then(director => {
          return superagent.delete(`${apiURL}/${director._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });
  });
  

});