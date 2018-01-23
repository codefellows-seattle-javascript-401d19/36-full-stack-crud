'use strict';

const faker = require('faker');
const directorsModel = require('../../model/directors');

const directorsMockData = module.exports = {};

directorsMockData.create = () => {

  return new directorsModel({
    name : faker.lorem.words(4),
    age : Math.floor(Math.random()*(100-1+1)+1),
  }).save();
};

directorsMockData.createMany = (amountToCreate) => {
  return Promise.all(new Array(amountToCreate).fill(0)
    .map(() => directorsMockData.create()));
};

directorsMockData.remove = () => directorsModel.remove({});