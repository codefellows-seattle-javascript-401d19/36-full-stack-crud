'use strict';

const { Router } = require('express');
const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();
const Category = require('../model/category');

const categoryRouter = module.exports = new Router();

categoryRouter.post('/api/categorys', jsonParser, (request, response, next) => {
  if (!request.body.name || !request.body.budget) {
    return next(httpErrors(400, 'category model requires a name'));
  }

  return new Category(request.body).save()
    .then(category => response.json(category))
    .catch(next);
});

categoryRouter.put('/api/categorys/:id', jsonParser, (request, response, next) => {
  let options = {new : true, runValidators : true};

  Category.findByIdAndUpdate(request.params.id, request.body, options)
    .then(category => {
      if (!category) {
        throw httpErrors(404, 'category not found');
      }
      return response.json(category);
    })
    .catch(next);
});

categoryRouter.get('/api/categorys/:id', (request, response, next) => {
  Category.findById(request.params.id)
    .then(category => {
      if (!category) {
        throw httpErrors(404,'category not found');
      }
      return response.json(category);
    })
    .catch(next);
});

categoryRouter.get('/api/categorys', (request, response, next) => {
  Category.find({})
    .then(categories => {
      return response.json(categories);
    })
    .catch(next);
});


categoryRouter.delete('/api/categorys/:id', (request, response, next) => {
  Category.findByIdAndRemove(request.params.id)
    .then(category => {
      if (!category) {
        throw httpErrors(404,'category not found');
      }

      return response.sendStatus(204);
    })
    .catch(next);
});
