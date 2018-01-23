'use strict';

const {Router} = require('express');
const jsonParser = require('express').json();
const httpError = require('http-errors');

const Expense = require('../model/expense');
const log = require('../lib/logger');

const expenseRouter = module.exports = new Router();

// ===================== POST ROUTES =====================
expenseRouter.post('/api/expense', jsonParser, (request, response, next) => {
  log('info', `==NAME==: ${request.body.name}`);
  log('info', `==SQUAREFEET==: ${request.body.squareFeet}`);
  log('info', `==FLOORING==: ${request.body.flooring}`);
  log('info', `==CATEGORYID==: ${request.body.category}`);

  if (!request.body.name || !request.body.squareFeet || !request.body.flooring) {
    return next(httpError(400), 'name, squareFeet and flooring are require');
  }

  new Expense(request.body).save()
    .then(expense => {
      log('info', `==_ID==: ${expense._id}`);
      log('info', `==TIMESTAMP==: ${expense.timestamp}`);
      log('info', 'POST - responding with a 200 status');
      response.json(expense);
      return;
    })
    .catch(next);
});

// ===================== GET ROUTES =====================
expenseRouter.get('/api/expense', (request, response, next) => {
  return Expense.find({})
    .then(allExpenses => {
      log('info', `==EXPENSES ARRAY==: ${allExpenses}`);
      log('info', 'GET - responding with a 200 status');
      return response.json(allExpenses);
    })
    .catch(next);
});

expenseRouter.get('/api/expense/:id', (request, response, next) => {
  return Expense.findById(request.params.id)
    .populate('category')
    .then(expense => {
      log('info', `==EXPENSE==: ${expense}`);
      if (!expense) {
        throw httpError(404, 'expense not found');
      }
      log('info', 'GET - responding with a 200 status');
      return response.json(expense);
    })
    .catch(next);
});

// ===================== PUT ROUTES =====================
expenseRouter.put('/api/expense/:id', jsonParser, (request, response, next) => {
  if (!request.params.id) {
    throw httpError(400, 'no ID given');
  }
  let updateOptions = {runValidators: true, new: true};
  return Expense.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then(expense => {
      if (!expense) {
        throw httpError(404, 'expense not found');
      } else {
        log('info', 'PUT - responding with a 200 status');
        return response.json(expense);
      }
    })
    .catch(next);
});

// ===================== DELETE ROUTES =====================
expenseRouter.delete('/api/expense/:id', (request, response, next) => {
  if (!request.params.id) {
    throw httpError(400, 'no ID given');
  }

  return Expense.findByIdAndRemove(request.params.id)
    .then(expense => {
      if (!expense) {
        throw httpError(404, 'expense not found');
      } else {
        log('info', 'DELETE - responding with a 204 status');
        return response.sendStatus(204);
      }
    })
    .catch(next);
});