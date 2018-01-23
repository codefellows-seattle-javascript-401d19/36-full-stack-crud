'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const shows = require('../model/shows');
const logger = require('../lib/logger');
const httpErrors = require('http-errors');

const showsRouter = module.exports = new Router();

showsRouter.post('/api/shows',jsonParser, (request,response,next) => {
  if(!request.body.title || !request.body.content) {
    return next(httpErrors(400,'body and content are required'));
  }
  
  return new shows(request.body).save()
    .then(shows => response.json(shows))
    .catch(error => next(error));
});


showsRouter.get('/api/shows/:id',(request,response,next) => {
  return shows.findById(request.params.id)
    .populate('director')
    .then(shows => {     
      if(!shows){
        throw httpErrors(404,'shows not found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(shows);
    }).catch(next);
});

showsRouter.delete('/api/shows/:id',(request,response,next) => {
  return shows.findByIdAndRemove(request.params.id)
    .then(shows => {
      if(!shows){
        throw httpErrors(404,'shows not found');
      }
      logger.log('info', 'GET - Returning a 204 status code');
      return response.sendStatus(204);
    }).catch(next);
});

showsRouter.put('/api/shows/:id',jsonParser,(request,response,next) => {
  let options = {runValidators: true, new : true};
  
  return shows.findByIdAndUpdate(request.params.id,request.body,options)
    .then(shows => {
      if(!shows){
        throw httpErrors(404,'shows not found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(shows);
    }).catch(next);
});