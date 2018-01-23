'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Category = require('../model/category');
const httpErrors = require('http-errors');

const categoryRouter = module.exports = new Router();

categoryRouter.post('/api/categories', jsonParser, (request,response, next) => {  
  if (!request.body.name || !request.body.budget) {
    return next(httpErrors(400, 'Body and Name are required'));
  }

  return new Category(request.body).save()
    .then(category => response.json(category))
    .catch(next);
});

categoryRouter.get('/api/categories/:id', (request,response,next) => {
  return Category.findById(request.params.id)
    .then(category => {
      if(!category){
        throw httpErrors(404, 'Category not found');
      }
      return response.json(category);
    }).catch(next);
});

categoryRouter.delete('/api/categories/:id', (request, response, next) => {
  return Category.findByIdAndRemove(request.params.id)
    .then(category => {
      if (!category) {
        throw httpErrors(404, 'Category not found');
      }
      return response.sendStatus(204);
    }).catch(next);
});

categoryRouter.put('/api/categories/:id', jsonParser, (request, response, next) => {
  let options = { runValidators: true, new: true };
  
  return Category.findByIdAndUpdate(request.params.id, request.body, options)
    .then(category => {
      if (!category) {
        throw httpErrors(404, 'Category not found');
      }
      return response.json(category);
    }).catch(next);
});