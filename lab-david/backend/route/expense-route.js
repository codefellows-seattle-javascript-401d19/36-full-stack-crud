'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Expense = require('../model/expense');
const logger = require('../lib/logger');
const httpErrors = require('http-errors');

const expenseRoute = module.exports = new Router();

expenseRoute.post('/api/expenses', jsonParser, (request,response,next) => {
  if(!request.body.name || !request.body.price) {
    return next(httpErrors(400, 'name and price are required'));
  }

  return new Expense(request.body).save()
    .then(expense => response.json(expense))
    .catch(error => next(error));
});

expenseRoute.get('/api/expenses/:id', (request,response,next) => {
  return Expense.findById(request.params.id)
    .populate('category')
    .then(expense => {
      if(!expense){
        throw httpErrors(404,`expense not found`);
      }
      logger.log('info', 'GET - returning a 200 status');
      return response.json(expense);
    })
    .catch(next);
});

expenseRoute.delete('/api/expenses/:id',(request,response,next) => {
  return Expense.findByIdAndRemove(request.params.id)
    .then(expense => {
      if(!expense){
        throw httpErrors(404,`expense was not found. go back to start, do not collect $200.`);
      }
      logger.log('info', 'GET -> returning a 204 status');
      return response.sendStatus(204);
    }).catch(next);
});

expenseRoute.put('/api/expenses/:id', jsonParser,(request,response,next) => {
  let options = {runValidators : true, new : true};

  return Expense.findByIdAndUpdate(request.params.id,request.body,options)
    .then(expense => {
      if(!expense){
        throw httpErrors(404, 'expense was not found');    
      }
      logger.log('info', 'PUT -> returning a 200 status code'); 
      return response.json(expense);
    })
    .catch(next);
});
