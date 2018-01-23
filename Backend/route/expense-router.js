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

//TODO fix this to reflect "next" syntax
expenseRouter.get('/api/expenses', (request, response, next) => {
  const PAGE_SIZE = 5;

  let {page = '0'} = request.query;
  page = Number(page);

  if(isNaN(page))
    page = 0;

  page = page < 0 ? 0 : page;

  let allExpenses = null;

  return Expense.find({})
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .then(expenses => {
      allExpenses = expenses;
      return Expense.find({}).count();
    })
    .then(expenseCount => {
      let responseData = {
        count: expenseCount,
        data: allExpenses,
      };

      let lastPage = Math.floor(expenseCount / PAGE_SIZE);

      response.links({
        next: `http://localhost:${process.env.PORT}/api/expenses?page=${page === lastPage ? lastPage : page + 1}`,
        prev: `http://localhost:${process.env.PORT}/api/expenses?page=${page < 1 ? 0 : page - 1}`,
        last: `http://localhost:${process.env.PORT}/api/expenses?page=${lastPage}`,
      });
      return response.json(responseData);
    });
});


expenseRouter.get('/api/expenses/:id', (request, response, next) => {
  return Expense.findById(request.params.id)
    .populate('discipline')
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