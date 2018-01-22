'use strict';

require('./lib/setup');
const server = require('../lib/server');
const superagent = require('superagent');
const showMock = require('./lib/show-mock');
const episodeMock = require('./lib/episode-mock');
const Episode = require('../model/episode');

const __API_URL__ = `http://localhost:${process.env.PORT}/api/shows`;

describe('show-router.js', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(showMock.remove);

  describe('POST /api/shows', () => {
    test('should respond with a 200 status and the sent object when successful.', () => {
      return superagent.post(__API_URL__)
        .send({
          title: 'Breaking Bad',
          seasons: 5,
          releaseYear: 2012,
          ongoing: false,
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Breaking Bad');
          expect(response.body.seasons).toEqual(5);
          expect(response.body.releaseYear).toEqual(2012);
          expect(response.body.ongoing).toBeFalsy();
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();
        });
    });

    test('should respond with a 400 status if schema validation fails, for example a missing title.', () => {
      return superagent.post(__API_URL__)
        .send({
          seasons: 5,
          releaseYear: 2012,
          ongoing: false,
        })
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 409 status if an object with a duplicate title is sent.', () => {
      return superagent.post(__API_URL__)
        .send({
          title: 'duplicate',
          seasons: 5,
        })
        .then(() => {
          return superagent.post(__API_URL__)
            .send({
              title: 'duplicate',
              seasons: 5,
            });
        })
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  });

  describe('GET /api/shows/:id', () => {
    test('should respond with a 200 status and the requested object.', () => {
      let myShow;
      return showMock.create()
        .then(show => {
          myShow = show;
          return superagent.get(`${__API_URL__}/${show._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual(myShow.title);
          expect(response.body.seasons).toEqual(myShow.seasons);
          expect(response.body.releaseYear).toEqual(myShow.releaseYear);
          expect(response.body.releaseYear).toEqual(myShow.releaseYear);
          expect(response.body.ongoing).toEqual(myShow.ongoing);
          expect(response.body.ongoing).toEqual(myShow.ongoing);
          expect(response.body._id).toEqual(myShow._id.toString());
        });
    });

    test('should respond with a 404 status if a show with the given id is not found.', () => {
      return superagent.get(`${__API_URL__}/fake-path`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('GET /api/shows?page=<number>', () => {
    test('should respond with an array of objects from the requested page if the requested page exists, and a 200 status.', () => {
      return showMock.createMany(100)
        .then(() => {
          return superagent.get(`${__API_URL__}?page=3`)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body.totalShows).toEqual(100);
              expect(response.body.totalPages).toEqual(10);
              expect(response.body.shows.length).toEqual(10);
            });
        });
    });

    test('should respond with a 400 status if route is hit without a query string.', () => {
      return superagent.get(__API_URL__)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 400 status if query string cannot be cast as a number.', () => {
      return superagent.get(`${__API_URL__}?page=foo`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 404 status if page query is < 1.', () => {
      return superagent.get(`${__API_URL__}?page=-3`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 404 status if page query is > last page.', () => {
      return superagent.get(`${__API_URL__}?page=13`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/shows/:id', () => {
    test('should respond with a 204 status if show is deleted.', () => {
      return showMock.create()
        .then(show => {
          return superagent.delete(`${__API_URL__}/${show._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should also delete any linked episodes upon success.', () => {
      let episodeId, showId;
      return episodeMock.create()
        .then(mock => {
          episodeId = mock.episode._id;
          showId = mock.show._id;
          
          return Episode.findById(episodeId);
        })
        .then(episode => {
          expect(episode).toBeTruthy();
          return superagent.delete(`${__API_URL__}/${showId}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
          return Episode.findById(episodeId);
        })
        .then(episode => {
          expect(episode).toBeFalsy();
        });
    });

    test('should respond with a 404 status if a show with the given id is not found.', () => {
      return superagent.delete(`${__API_URL__}/fake-path`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/shows/:id', () => {
    test('should respond with a 200 and updated object if no errors.', () => {
      let myShow;
      return showMock.create()
        .then(show => {
          myShow = show;
          return superagent.put(`${__API_URL__}/${show._id}`)
            .send({
              title: 'Frank the Bunny',
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Frank the Bunny');
          expect(response.body.seasons).toEqual(myShow.seasons);
          expect(response.body.releaseYear).toEqual(myShow.releaseYear);
          expect(response.body.releaseYear).toEqual(myShow.releaseYear);
          expect(response.body.ongoing).toEqual(myShow.ongoing);
        });
    });

    test('should respond with a 409 if data validation fails, for example if you change the title to a preexisting title.', () => {
      let myShowTitle;
      return showMock.create()
        .then(show => {
          myShowTitle = show.title;
          return showMock.create();
        })
        .then(show => {
          return superagent.put(`${__API_URL__}/${show._id}`)
            .send({title: myShowTitle});
        })
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });

    test('should respond with a 404 if a bad id is requested.', () => {
      return superagent.put(`${__API_URL__}/fake-path`)
        .send({
          title: 'fake stuff',
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