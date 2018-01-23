'use strict';

const {Router} = require('express');
const jsonParser = require('express').json();
const httpErrors = require('http-errors');
const logger = require('../lib/logger');
const Expense = require('../model/expense');

const expenseRouter = module.exports = new Router();

const repackExpense = expense => ({
  name: expense.name,
  price: expense.price,
  categoryId: expense.category.toString(),
  timestamp: expense.timestamp,
  id: expense._id.toString(),
});

expenseRouter.post('/api/expenses', jsonParser, (request, response, next) => {
  return new Expense(request.body).save()
    .then(expense => {
      logger.info('Expense added, responding with a 200 status and the document.');
      return response.json({expense: repackExpense(expense)});
    })
    .catch(next);
});

expenseRouter.get('/api/expenses', (request, response, next) => {
  return Expense.find({})
    .then(expenses => {
      expenses = expenses.map(expense => repackExpense(expense));

      logger.info('GET - responding with all expenses.');

      return response.json({expenses});
    })
    .catch(next);
});

expenseRouter.get('/api/expenses/:id', (request, response, next) => {
  return Expense.findById(request.params.id)
    .then(expense => {
      if(!expense) {
        logger.error('GET - expense with id not found. Sending 404.');
        return response.sendStatus(404);
      }

      return response.json({expense: repackExpense(expense)});
    })
    .catch(next);
});

expenseRouter.delete('/api/expenses/:id', (request, response, next) => {
  return Expense.findByIdAndRemove(request.params.id)
    .then(expense => {
      if(!expense) {
        logger.error('DELETE - expense with id not found. Sending 404.');
        return response.sendStatus(404);
      }
      
      logger.info('expense found. Responding with a 204 status.');
      return response.sendStatus(204);
    }).catch(next);
});

expenseRouter.put('/api/expenses/:id', jsonParser, (request, response, next) => {
  if (!Object.keys(request.body).length)
    return next(httpErrors(400, 'Bad Request. No Body.'));

  return Expense.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})
    .then(expense => {
      if(!expense) {
        logger.error('PUT - expense with id not found. Sending 404.');
        return response.sendStatus(404);
      }
      
      logger.info('Show found. Responding with a 200 status.');
      return response.json({expense: repackExpense(expense)});
    }).catch(next);
});

