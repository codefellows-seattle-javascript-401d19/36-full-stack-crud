'use strict';

const faker = require('faker');
const Category = require('../../model/category');

const categoryMock = module.exports = {};

categoryMock.create = () => {
  return new Category({
    name: faker.lorem.words(1),
    tags: faker.lorem.words(3).split(' '),
  }).save()
    .catch(console.log);
};

categoryMock.createMany = (howMany) => {
  return Promise.all(new Array(howMany)
    .fill(0)
    .map( () => categoryMock.create()));
};


categoryMock.remove = () => Category.remove ({});