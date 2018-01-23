'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const directorModel = require('../model/directors');
const httpErrors = require('http-errors');

const directorRouter = module.exports = new Router();

directorRouter.post('/api/directors',jsonParser, (request, response, next)=>{
  if(!request.body.name || !request.body.shows){
    return next(httpErrors(400, 'name and shows are required'));
  }
  return new directorModel(request.body).save()
    .then(director => response.json(director))
    .catch(next);
});

directorRouter.get('/api/directors/:id', (request, response, next) => {
  return directorModel.findById(request.params.id)
    .then(director => {
      if(!director){
        throw httpErrors(404,('Director not found'));
      }
      return response.json(director);   
    }).catch(next);
});


directorRouter.get('/api/directors/', (request, response, next) => {
  return directorModel.find({})
    .then(directors => {
      if(!directors){
        throw httpErrors(404, ('Directors Not Found'));
      }
      return response.json(directors);
    }).catch(next);
});

directorRouter.put('/api/directors/:id',jsonParser,(request,response,next) => {
  let options = {new : true, runValidators: true};
  
  return directorModel.findByIdAndUpdate(request.params.id,request.body,options)
    .then(director => {
      if(!director){
        throw httpErrors(404,'director not found');
      }
      return response.json(director);
    }).catch(next);
});

directorRouter.delete('/api/directors/:id', (request, response, next) => {
  return directorModel.findByIdAndRemove(request.params.id)
    .then(director => {
      if(!director){
        throw httpErrors(404, 'director not found');
      }
      return response.sendStatus(204);
    }).catch(next);
});