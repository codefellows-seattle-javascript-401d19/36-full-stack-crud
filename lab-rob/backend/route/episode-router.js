'use strict';

const {Router} = require('express');
const jsonParser = require('express').json();
const httpErrors = require('http-errors');
const logger = require('../lib/logger');
const Episode = require('../model/episode');

const episodeRouter = module.exports = new Router();

episodeRouter.post('/api/episodes', jsonParser, (request, response, next) => {
  return new Episode(request.body).save()
    .then(episode => {
      logger.info('Episode added, responding with a 200 status.');
      return response.json(episode);
    }).catch(next);
});

episodeRouter.get('/api/episodes/:id', (request, response, next) => {
  return Episode.findById(request.params.id)
    .then(episode => {
      if(!episode) {
        logger.error('GET - episode with id not found. Sending 404.');
        return response.sendStatus(404);
      }

      return response.json(episode);
    })
    .catch(next);
});

episodeRouter.delete('/api/episodes/:id', (request, response, next) => {
  return Episode.findByIdAndRemove(request.params.id)
    .then(episode => {
      if(!episode) {
        logger.error('DELETE - episode with id not found. Sending 404.');
        return response.sendStatus(404);
      }
      
      logger.info('Show found. Responding with a 204 status.');
      return response.sendStatus(204);
    }).catch(next);
});

episodeRouter.put('/api/episodes/:id', jsonParser, (request, response, next) => {
  if (!Object.keys(request.body).length)
    return next(httpErrors(400, 'Bad Request. No Body.'));

  return Episode.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})
    .then(episode => {
      if(!episode) {
        logger.error('PUT - episode with id not found. Sending 404.');
        return response.sendStatus(404);
      }
      
      logger.info('Show found. Responding with a 200 status.');
      return response.json(episode);
    }).catch(next);
});

