'use strict';

const {Router} = require('express');
const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();
const Country = require('../model/country');

const countryRouter = module.exports = new Router();

// POST ROUTE
countryRouter.post('/api/countries',jsonParser,(request,response,next) => {
  if(!request.body.name)
    return next(httpErrors(400,'country model requires a name'));
  
  return new Country(request.body).save()
    .then(country => {
      
      response.json(country);
    })
    .catch(next);
});

// PUT ROUTE
countryRouter.put('api/countries/:id', jsonParser, (request, response, next) => {
  let options = { new : true, runValidators : true};

  return Country.findByIdAndUpdate(request.params._id, request.body, options)
    .then(country => {
      if(!country)
        throw httpErrors(404, 'country not found');
      return response.json(country);
    })
    .catch(next);
});

// GET ALL ROUTE
countryRouter.get('/api/countries', (request, response, next) => {
  return Country.find({})
    .then(countries => response.json(countries.map(country => country._id)))
    .catch(next);
});

// GET by ID ROUTE
countryRouter.get('/api/countries/:id',(request,response,next) => {
  return Country.findById(request.params.id)
    .then(country => {
      if(!country)
        throw httpErrors(404,'country not found');
      return response.json(country);
    })
    .catch(next);
});

// DELETE ROUTE
countryRouter.delete('/api/countries/:id',(request,response,next) => {
  return Country.findByIdAndRemove(request.params.id)
    .then(country => {
      if(!country)
        throw httpErrors(404,'country not found');

      return response.sendStatus(204);
    })
    .catch(next);
});
