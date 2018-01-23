'use strict';

const {Router} = require('express');
const jsonParser = require('express').json();
const Show = require('../model/show');
const Episode = require('../model/episode');
const httpErrors = require('http-errors');
const logger = require('../lib/logger');

const SHOWS_PER_PAGE = 10;

const showRouter = module.exports = new Router();

showRouter.post('/api/shows', jsonParser, (request, response, next) => {
  return new Show(request.body).save()
    .then(show => {
      logger.info('New show added to the database. Responding with a 200 status and the object.');
      return response.json(show);
    })
    .catch(next);
});

const getAllShows = (populateQuery) => populateQuery === 'true' ? Show.find({}).populate('episodes') : Show.find({});

showRouter.get('/api/shows', (request, response, next) => {
  return getAllShows(request.query.populate)
    .then(shows => {
      logger.info(`Returning all shows.`);

      return response.json({shows});
    })
    .catch(next);
});

const getShows = (populateQuery, showId) => populateQuery === 'true' ? Show.findById(showId).populate('episodes') : Show.findById(showId);

showRouter.get('/api/shows/:id', (request, response, next) => {
  return getShows(request.query.populate, request.params.id)
    .then(show => {
      if(!show)
        throw httpErrors(404, `No show with id ${request.params.id}.`);

      logger.info('Show found. Responding with a 200 status and the object.');
      return response.json(show);
    })
    .catch(next);
});

showRouter.delete('/api/shows/:id', (request, response, next) => {
  return Show.findByIdAndRemove(request.params.id)
    .then(show => {
      if(!show)
        throw httpErrors(404, `No show with id ${request.params.id}.`);

      logger.info('Show found. Removing linked episodes.');        
      return Episode.remove({show: request.params.id});
    })
    .then(() => {
      logger.info('Linked episodes removed, responding with a 204.');
      return response.sendStatus(204);
    })
    .catch(next);
});

showRouter.put('/api/shows/:id', jsonParser, (request, response, next) => {
  if(!Object.keys(request.body).length)
    return next(httpErrors(400, 'Bad Request. No Body.'));

  return Show.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})
    .then(show => {
      if(!show)
        throw httpErrors(404, `No show with id ${request.params.id}.`);

      logger.info('Show found. Responding with a 200 status and the updated entry.');
      return response.json(show);
    })
    .catch(next);
});