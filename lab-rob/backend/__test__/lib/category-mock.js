'use strict';

const Category = require('../../model/category');
const faker = require('faker');

const categoryMock = module.exports = {};

categoryMock.create = () => {
  return new Category({
    name: faker.random.word(),
    budget: faker.random.number(200),
  }).save();
};

categoryMock.createMany = num => {
  let categories = new Array(num);
  return Promise.all(categories.fill(0).map(() => categoryMock.create()));
};

categoryMock.remove = () => {
  return Category.remove({});
};