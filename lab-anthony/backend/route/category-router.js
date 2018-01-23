'use strict';

const {Router} = require('express');
const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();
const Category = require('../model/category');
const logger = require('../lib/logger');

const categoryRouter = module.exports = new Router();

categoryRouter.post('/api/categories', jsonParser, (request, response, next) => {
  if(!request.body.name) {
    return next(httpErrors(400, 'name is required'));
  }
  return new Category(request.body).save()
    .then(category => {
      return response.json(category);
    })
    .catch(next);
});

categoryRouter.get('/api/categories/:id', (request, response, next) => {
  return Category.findById(request.params.id)
    .then(category => {
      if(!category) {
        throw httpErrors(404, 'category not found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(category);
    }).catch(next);
});

categoryRouter.get('/api/categories/', (request, response, next) => {
  const PAGE_SIZE = 10;

  let {page = '0'} = request.query;
  page = Number(page);

  if(isNaN(page))
    page = 0;

  page = page < 0 ? 0 : page;

  let allCategories = null;

  return Category.find({})
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .then(categories => {
      allCategories = categories;
      return Category.find({}).count();
    })
    .then(categoryCount => {
      let responseData = {
        count : categoryCount,
        data : allCategories,
      };

      let lastPage = Math.floor(categoryCount / PAGE_SIZE);

      response.links({
        next : `http://localhost:${process.env.PORT}/api/categories?page=${page === lastPage ? lastPage : page + 1}`,
        prev : `http://localhost:${process.env.PORT}/api/categories?page=${page < 1 ? 0 : page - 1}`,
        last : `http://localhost:${process.env.PORT}/api/categories?page=${lastPage}`,
      });
      response.json(responseData);
    });
});

categoryRouter.delete('/api/categories/:id', (request, response, next) => {
  logger.log('info', 'DELETE - processing a request');
  return Category.findById(request.params.id)
    .then(category => {
      if(!category) {
        throw httpErrors(404, 'category not found');
      } else {
        return Category.deleteOne({_id : category._id})
          .then((results) => {
            if(results.deletedCount === 1)
              return response.sendStatus(204);
          });
      }
    }).catch(next);
});

categoryRouter.put('/api/categories/:id', jsonParser, (request, response, next) => {
  let options = {runValidators: true, new : true};

  return Category.findByIdAndUpdate(request.params.id, request.body, options)
    .then(category => {
      if(!category){
        throw httpErrors(404, 'category not found');
      }
      logger.log('info', 'PUT - Returning a 200 status code');
      return response.json(category);
    }).catch(next);
});
