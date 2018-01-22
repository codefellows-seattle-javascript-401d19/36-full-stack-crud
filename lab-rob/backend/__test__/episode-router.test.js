'use strict';

require('./lib/setup');
const episodeMock = require('./lib/episode-mock');
const showMock = require('./lib/show-mock');
const server = require('../lib/server');
const superagent = require('superagent');
const __API_URL__ = `http://localhost:${process.env.PORT}/api/episodes`;

describe('episode-router.js', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(episodeMock.remove);

  describe('POST /api/episodes', () => {
    test('should respond with a 200 status code and the sent object if no errors.', () => {
      let myEpisode = {
        name: 'And then there was a boom',
        number: 1,
        duration: 30,
        stars: 2,
        actors: ['Andy Samberg', 'Rosario Dawson'],
      };

      return showMock.create()
        .then(show => {
          myEpisode.show = show._id;
          return superagent.post(__API_URL__)
            .send(myEpisode);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(myEpisode.name);
          expect(response.body.number).toEqual(myEpisode.number);
          expect(response.body.duration).toEqual(myEpisode.duration);
          expect(response.body.stars).toEqual(myEpisode.stars);
          expect(response.body.actors).toEqual(myEpisode.actors);
          expect(response.body.timestamp).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          expect(response.body.show.toString()).toEqual(myEpisode.show.toString());
        });
    });

    test('should respond with a 400 status if missing episode name.', () => {
      let myIncompleteEpisode = {
        number: 1,
        duration: 30,
        stars: 2,
        actors: ['Andy Samberg', 'Rosario Dawson'],
      };

      return showMock.create()
        .then(show => {
          myIncompleteEpisode.show = show._id;
          return superagent.post(__API_URL__)
            .send(myIncompleteEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 400 status if missing episode number.', () => {
      let myIncompleteEpisode = {
        name: 'Shmoopy Schmaaapy',
        duration: 30,
        stars: 2,
        actors: ['Andy Samberg', 'Rosario Dawson'],
      };

      return showMock.create()
        .then(show => {
          myIncompleteEpisode.show = show._id;
          return superagent.post(__API_URL__)
            .send(myIncompleteEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 400 status if missing show id.', () => {
      let myIncompleteEpisode = {
        name: 'Shmoopy Schmaaapy',
        number: 1,
        duration: 30,
        stars: 2,
        actors: ['Andy Samberg', 'Rosario Dawson'],
      };

      return showMock.create()
        .then(() => {
          return superagent.post(__API_URL__)
            .send(myIncompleteEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 404 status if an incorrect show id is used.', () => {
      let myAwkwardEpisode = {
        name: 'Shmoopy Schmaaapy',
        number: 1,
        duration: 30,
        stars: 2,
        actors: ['Andy Samberg', 'Rosario Dawson'],
      };

      return showMock.create()
        .then(show => {
          myAwkwardEpisode.show = show._id;
          return showMock.remove();
        })
        .then(() => {
          return superagent.post(__API_URL__)
            .send(myAwkwardEpisode);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 409 status if an object with a duplicate episode name is sent.', () => {
      let myMock;
      return episodeMock.create()  
        .then(mock => {
          myMock = mock;
          return superagent.post(__API_URL__)
            .send({
              name: myMock.episode.name,
              number: 12,
              show: myMock.show._id,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  }); 

  describe('GET /api/episodes/:id', () => {
    test('should respond with a 200 status code and the requested object.', () => {
      let myMock;
      return episodeMock.create()
        .then(mock => {
          myMock = mock;
          return superagent.get(`${__API_URL__}/${mock.episode._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(myMock.episode.name);
          expect(response.body.number).toEqual(myMock.episode.number);
          expect(response.body.duration).toEqual(myMock.episode.duration);
          expect(response.body.stars).toEqual(myMock.episode.stars);
          expect(JSON.stringify(response.body.actors)).toEqual(JSON.stringify(myMock.episode.actors));
          expect(response.body.timestamp).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          expect(response.body.show.toString()).toEqual(myMock.episode.show.toString());
        });
    });

    test('should respond with a 404 status code if id is not in database.', () => {
      return episodeMock.create()
        .then(() => {
          return superagent.get(`${__API_URL__}/no-thanks-boss`);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/episodes/:id', () => {
    test('should respond with a 204 when removing an episode successfully.', () => {
      return episodeMock.create()
        .then(mock => {
          return superagent.delete(`${__API_URL__}/${mock.episode._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });
    
    test('should respond with a 204 when removing an episode successfully.', () => {
      return superagent.delete(`${__API_URL__}/fakey-mcfake-fake`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/episodes/:id', () => {
    test('should respond with a 200 and updated object if no errors.', () => {
      let myEpisode;
      return episodeMock.create()
        .then(mock => {
          myEpisode = mock.episode;
          return superagent.put(`${__API_URL__}/${mock.episode._id}`)
            .send({
              name: 'Cool Episode',
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Cool Episode');
          expect(response.body.number).toEqual(myEpisode.number);
          expect(JSON.stringify(response.body.actors)).toEqual(JSON.stringify(myEpisode.actors));
          expect(response.body.stars).toEqual(myEpisode.stars);
        });
    });

    test('should respond with a 409 if data validation fails, for example if you change the name to a preexisting name.', () => {
      let myEpisodeName;
      return episodeMock.create()
        .then(mock => {
          myEpisodeName = mock.episode.name;
          return episodeMock.create();
        })
        .then(mock => {
          return superagent.put(`${__API_URL__}/${mock.episode._id}`)
            .send({ name: myEpisodeName });
        })
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });

    test('should respond with a 404 if a bad id is requested.', () => {
      return superagent.put(`${__API_URL__}/fake-path`)
        .send({
          name: 'fake stuff',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 400 if no body sent.', () => {
      return superagent.put(`${__API_URL__}/123`)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });

});