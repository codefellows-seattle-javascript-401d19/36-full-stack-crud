'use strict';

const {Router} = require('express');
const jsonParser = require('express').json();
const Category = require('../model/category');
const Expense = require('../model/expense');
const httpErrors = require('http-errors');
const logger = require('../lib/logger');

const categoryRouter = module.exports = new Router();

const repackCategory = category => ({
  category: {
    name: category.name,
    budget: category.budget,
    timestamp: category.timestamp,
    id: category._id.toString(),
  },
});

categoryRouter.post('/api/categories', jsonParser, (request, response, next) => {
  return new Category(request.body).save()
    .then(category => {
      logger.info('New category added to the database. Responding with a 200 status and the document.');
      return response.json(repackCategory(category));
    })
    .catch(next);
});

const getAllCategories = (populateQuery) => populateQuery === 'true' ? Category.find({}).populate('expenses') : Category.find({});

categoryRouter.get('/api/categories', (request, response, next) => {
  return getAllCategories(request.query.populate)
    .then(categories => {
      logger.info(`Returning all categories.`);

      return response.json({categories});
    })
    .catch(next);
});

const getCategories = (populateQuery, categoryId) => populateQuery === 'true' ? Category.findById(categoryId).populate('expenses') : Category.findById(categoryId);

categoryRouter.get('/api/categories/:id', (request, response, next) => {
  return getCategories(request.query.populate, request.params.id)
    .then(category => {
      if(!category)
        throw httpErrors(404, `No category with id ${request.params.id}.`);

      logger.info('Category found. Responding with a 200 status and the object.');
      return response.json({category});
    })
    .catch(next);
});

categoryRouter.delete('/api/categories/:id', (request, response, next) => {
  return Category.findByIdAndRemove(request.params.id)
    .then(category => {
      if(!category)
        throw httpErrors(404, `No category with id ${request.params.id}.`);

      logger.info('Category found. Removing linked expenses.');        
      return Expense.remove({category: request.params.id});
    })
    .then(() => {
      logger.info('Linked expenses removed, responding with a 204.');
      return response.sendStatus(204);
    })
    .catch(next);
});

categoryRouter.put('/api/categories/:id', jsonParser, (request, response, next) => {
  if(!Object.keys(request.body).length)
    return next(httpErrors(400, 'Bad Request. No Body.'));

  return Category.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})
    .then(category => {
      if(!category)
        throw httpErrors(404, `No category with id ${request.params.id}.`);

      logger.info('Category found. Responding with a 200 status and the updated entry.');
      return response.json({category});
    })
    .catch(next);
});