'use strict';

const {Router} = require('express');

const jsonParser = require('body-parser').json();

const Expense = require('../model/expense');

const logger = require('../lib/logger');

const httpErrors = require('http-errors');

const expenseRouter = module.exports = new Router();

//the next callback does not return a promise; this was introduce prior to that functionality
expenseRouter.post('/api/expenses', jsonParser, (request, response, next) => {
  if(!request.body.description || !request.body.price) {
    return next(httpErrors(400, 'Description and price are required'));
  }
  return new Expense(request.body).save()  
    .then(expense => response.json(expense))
    .catch(error => next(error));
});

expenseRouter.get('/api/expenses', (request, response, next) => {
  
  return Expense.find({})
    .then(expenses => {
      console.log('Expenses from get route', expenses);
      return response.json(expenses);
    })
    .catch(next);
});


expenseRouter.get('/api/expenses/:id', (request, response, next) => {
  return Expense.findById(request.params.id)
    .populate('category')
    .then(expense => {
      if(!expense) {
        throw httpErrors(404, 'Expense not found with this id');
      }
      logger.log('info', 'GET - responding with a 200 success code at /api/expenses/:id');
      return response.json(expense);
    })
    .catch(next);
});

expenseRouter.put('/api/expenses/:id', jsonParser,  (request, response, next) => {
  let options = { runValidators: true, new: true};
  return Expense.findByIdAndUpdate(request.params.id, request.body, options)
    .then(expense => {
      if(!expense) {
        throw httpErrors(404, 'Expense not found with this id');
      }
      logger.log('info', 'PUT - responding with a 200 success code at /api/expenses/:id');
      return response.json(expense);
    })
    .catch(next);
});

expenseRouter.delete('/api/expenses/:id', (request, response, next) => {
  return Expense.findByIdAndRemove(request.params.id)
    .then(expense => {
      if (!expense) {
        throw httpErrors(404, 'Expense not found with this id');
      }
      logger.log('info', 'DELETE - responding with a 204 success code at /api/expenses/:id');
      return response.sendStatus(204);
    })
    .catch(next);
}); 