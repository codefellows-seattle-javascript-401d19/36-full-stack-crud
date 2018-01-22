'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const httpErrors = require('http-errors');

const logger = require('../lib/logger');
const Expense = require('../model/expense');

const expenseRouter = module.exports = new Router();

expenseRouter.post('/api/expenses', jsonParser, (request, response, next) => {
  if (!request.body.name || !request.body.price) {
    return next(httpErrors(400, 'name and price are required'));
  }

  return new Expense(request.body).save()
    .then(expense => response.json(expense))
    .catch(next);
});

expenseRouter.get('/api/expenses/:id', (request, response, next) => {
  Expense.findById(request.params.id)
    .populate('category')
    .then(expense => {
      if (!expense) {
        throw httpErrors(404, 'expense not found');
      }
      logger.log('info', 'GET - returning a 200 status code');
      logger.log('info', expense);

      return response.json(expense);
    })
    .catch(next);
});

expenseRouter.get('/api/expenses', (request, response, next) => {
  Expense.find({})
    .then(expense => {
      logger.log('info', 'GET - returning a 200 status code');
      logger.log('info', expense);

      return response.json(expense);
    })
    .catch(next);
});

expenseRouter.put('/api/expenses/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };

  Expense.findByIdAndUpdate(request.params.id, request.body, options)
    .then(expense => {
      if (!expense) {
        throw httpErrors(404, 'expense with id not found');
      }
      logger.log('info', 'PUT - returning a 200 status code');
      logger.log('info', expense);

      return response.json(expense);
    })
    .catch(next);
});

expenseRouter.delete('/api/expenses/:id', (request, response, next) => {
  Expense.findOneAndRemove(request.params.id)
    .then(expense => {
      if (!expense) {
        throw httpErrors(404, 'expense with id not found');
      }
      logger.log('info', 'DELETE - returning a 204 status code');
      logger.log('info', expense);

      return response.sendStatus(204);
    })
    .catch(next);
});

expenseRouter.delete('/api/expenses', (request, response, next) => {
  logger.log('info', 'DELETE - returning a 400 status code. No id provided');
  return next(httpErrors(400, 'id required'));
});
