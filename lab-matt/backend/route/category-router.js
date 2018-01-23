'use strict';

const {Router} = require('express');
const jsonParser = require('express').json();
const httpError = require('http-errors');

const Category = require('../model/category');
const log = require('../lib/logger');

const categoryRouter = module.exports = new Router();

// ===================== POST ROUTES =====================
categoryRouter.post('/api/category', jsonParser, (request, response, next) => {
  log('info', `==NAME==: ${request.body.name}`);
  log('info', `==STORIES==: ${request.body.stories}`);
  log('info', `==CLIMATE==: ${request.body.climate}`);

  if (!request.body.name || !request.body.stories || !request.body.climate) {
    return next(httpError(400), 'name, stories and climate are require');
  }

  new Category(request.body).save()
    .then(category => {
      log('info', `==_ID==: ${category._id}`);
      log('info', `==TIMESTAMP==: ${category.timestamp}`);
      log('info', 'POST - responding with a 200 status');
      response.json(category);
      return;
    })
    .catch(next);
});

// ===================== GET ROUTES =====================
categoryRouter.get('/api/category', (request, response, next) => {
  return Category.find({})
    .populate('expenses')
    .then(allCategories => {
      log('info', 'GET - responding with a 200 status');
      return response.json(allCategories);
    })
    .catch(next);
});

categoryRouter.get('/api/category/:id', (request, response, next) => {
  return Categorys.findById(request.params.id)
    .then(category => {
      log('info', `==CATEGORY==: ${category}`);
      if (!category) {
        throw httpError(404, 'category not found');
      }
      log('info', 'GET - responding with a 200 status');
      return response.json(category);
    })
    .catch(next);
});

// ===================== PUT ROUTES =====================
categoryRouter.put('/api/category/:id', jsonParser, (request, response, next) => {
  if (!request.params.id) {
    throw httpError(400, 'no ID given');
  }
  let updateOptions = {runValidators: true, new: true};

  return Category.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then(category => {
      if (!category) {
        throw httpError(404, 'category not found');
      } else {
        log('info', 'PUT - responding with a 200 status');
        return response.json(category);
      }
    })
    .catch(next);
});

// ===================== DELETE ROUTES =====================
categoryRouter.delete('/api/category/:id', (request, response, next) => {
  if (!request.params.id) {
    throw httpError(400, 'no ID given');
  }

  return Category.findByIdAndRemove(request.params.id)
    .then(category => {
      if (!category) {
        throw httpError(404, 'category not found');
      } else {
        log('info', 'DELETE - responding with a 204 status');
        return response.sendStatus(204);
      }
    })
    .catch(next);
});