'use strict';

const faker = require('faker');
const Category = require('../../model/category');

const categoryMock = module.exports = {};

categoryMock.create = () => {
  return new Category({
    name : faker.internet.userName(1),
    budgetTotal : faker.random.number(1),
  }).save();
};

categoryMock.createMany = (creationCount) => {
  return Promise.all(new Array(creationCount).fill(0)
    .map(() => categoryMock.create()));
};

categoryMock.remove = () => Category.remove({});