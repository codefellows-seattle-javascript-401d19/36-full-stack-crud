'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Expense = require('../model/expense');
const logger = require('../lib/logger');
const httpErrors = require('http-errors');

const expenseRouter = module.exports = new Router();

expenseRouter.post('/api/expenses', jsonParser, (request,response, next) => {  
  if(!request.body.name || !request.body.price) {
    return next(httpErrors(400, 'body and price are required'));
  }

  return new Expense(request.body).save()
    .then(expense => response.json(expense))
    .catch(error => next(error));
});

expenseRouter.get('/api/expenses', (request,response,next) => {
  return Expense.find({})
    .then(expenses => {
      if(!expenses){
        throw httpErrors(404, 'No Expenses Found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(expenses);
    }).catch(next);
});

expenseRouter.get('/api/expenses/:id', (request,response,next) => {
  return Expense.findById(request.params.id)
    .populate('category')
    .then(expense => {
      if(!expense){
        throw httpErrors(404, 'Expense not found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(expense);
    }).catch(next);
});

expenseRouter.delete('/api/expenses/:id', (request, response, next) => {
  return Expense.findByIdAndRemove(request.params.id)
    .then(expense => {
      if (!expense) {
        throw httpErrors(404, 'expense not found');
      }
      logger.log('info', 'DELETE - Returning a 204 status code');
      return response.sendStatus(204);
    }).catch(next);
});

expenseRouter.put('/api/expenses/:id', jsonParser, (request, response, next) => {
  let options = { runValidators: true, new: true };

  return Expense.findByIdAndUpdate(request.params.id, request.body, options)
    .then(expense => {
      if (!expense) {
        throw httpErrors(404, 'expense not found');
      }
      logger.log('info', 'PUT - Returning a 200 status code');
      return response.json(expense);
    }).catch(next);
});