'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Beer = require('../model/beer');
const logger = require('../lib/logger');
const httpErrors = require('http-errors');

const beerRouter = module.exports = new Router();

beerRouter.post('/api/beers', jsonParser, (request, response, next) => {

  if(!request.body.name || !request.body.style) {
    return next(httpErrors(400, 'name and style are required'));
  }

  return new Beer(request.body).save()
    .then(beer => {
      return response.json(beer);
    })
    .catch(next);
});

beerRouter.get('/api/beers/', (request, response, next) => {
  const PAGE_SIZE = 10;

  let {page = '0'} = request.query;
  page = Number(page);

  if(isNaN(page))
    page = 0;

  page = page < 0 ? 0 : page;

  let allBeers = null;

  return Beer.find({})
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .then(beers => {
      allBeers = beers;
      return Beer.find({}).count();
    })
    .then(beerCount => {
      let responseData = {
        count : beerCount,
        data : allBeers,
      };

      let lastPage = Math.floor(beerCount / PAGE_SIZE);

      response.links({
        next : `http://localhost:${process.env.PORT}/api/beers?page=${page === lastPage ? lastPage : page + 1}`,
        prev : `http://localhost:${process.env.PORT}/api/beers?page=${page < 1 ? 0 : page - 1}`,
        last : `http://localhost:${process.env.PORT}/api/beers?page=${lastPage}`,
      });
      response.json(responseData);
    });
});

beerRouter.get('/api/beers/:id', (request, response, next) => {
  return Beer.findById(request.params.id)
    .then(beer => {
      if(!beer) {
        throw httpErrors(404, 'beer not found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(beer);
    }).catch(next);
});

beerRouter.delete('/api/beers/:id', (request, response, next) => {
  logger.log('info', 'DELETE - processing a request');

  return Beer.findById(request.params.id)
    .then(beer => {
      if(!beer) {
        throw httpErrors(404, 'beer not found');
      } else {
        return Beer.deleteOne({_id : beer._id})
          .then((results) => {
            if(results.deletedCount === 1)
              return response.sendStatus(204);
          });
      }
    }).catch(next);
});

beerRouter.put('/api/beers/:id', jsonParser, (request, response, next) => {
  let options = {runValidators: true, new : true};

  return Beer.findByIdAndUpdate(request.params.id, request.body, options)
    .then(beer => {
      if(!beer){
        throw httpErrors(404, 'beer not found');
      }
      logger.log('info', 'PUT - Returning a 200 status code');
      return response.json(beer);
    }).catch(next);
});
