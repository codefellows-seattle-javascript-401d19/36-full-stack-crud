'use strict';

const logger = require('./logger');

module.exports = (error, request, response, next) => {

  //--------------------------HTTP ERRORS-------------------------------
  logger.log('info', '__ERROR_MIDDLEWARE__');
  logger.log('info', error);

  if(error.status){
    logger.log('info', 'Repsonding with a ${error.status} status');
    return response.sendStatus(error.status);
  }

  //--------------------------  MONGO ERRORS -------------------------------
  let message = error.message.toLowerCase();
  // Seth Donohue -  This if needs to execute before 'validation failed', or we'll get the wrong error
  if (message.includes('objectid failed')) {
    logger.log('info', 'Responding with a 404 status code');
    return response.sendStatus(404);
  }

  if (message.includes('validation failed')) {
    logger.log('info', 'Responding with a 400 status code');
    return response.sendStatus(400);
  }

  if (message.includes('duplicate key')) {
    logger.log('info', 'Responding with a 409 status code');
    return response.sendStatus(409);
  }

  if (message.includes('unauthorized')) {
    logger.log('info', 'Responding with a 401 status code');
    return response.sendStatus(401);
  }

  //--------------------------INTERNAL ERRORS-------------------------------
  logger.log('info', 'Responding with a 500 status code');
  logger.log('info', error);
  return response.sendStatus(500);


};