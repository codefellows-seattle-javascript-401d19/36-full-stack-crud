'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Category = require('../model/category');
const httpErrors = require('http-errors');

const categoryRoute = module.exports = new Router();

categoryRoute.post('/api/categories', jsonParser, (request,response,next) => {
  if(!request.body.name)
    return next(httpErrors(400, 'category model requires a name'));

  return new Category(request.body).save()
    .then(category => response.json(category))
    .catch(next);
});

categoryRoute.put('/api/categories/:id', jsonParser,(request,response,next) => {
  let options = {runValidators : true, new : true};

  return Category.findByIdAndUpdate(request.params.id,request.body,options)
    .then(category => {
      if(!category)
        throw httpErrors(404, 'category was not found');      
      return response.json(category);
    })
    .catch(next);
});

categoryRoute.get('/api/categories/:id', (request,response,next) => {
  return Category.findById(request.params.id)
    .then(category => {
      if(!category)
        throw httpErrors(404,`category not found`);
      return response.json(category);
    })
    .catch(next);
});

categoryRoute.delete('/api/categories/:id',(request,response,next) => {
  return Category.findByIdAndRemove(request.params.id)
    .then(category => {
      if(!category){
        throw httpErrors(404,`expense was not found. go back to start, do not collect $200.`);
      }
      return response.sendStatus(204);
    }).catch(next);
});
