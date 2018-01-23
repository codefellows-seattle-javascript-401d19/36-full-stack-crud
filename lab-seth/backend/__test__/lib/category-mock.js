'use strict';

const faker = require('faker');
const category = require('../../model/category');

const categoryMock = module.exports = {};

categoryMock.create = () => {
  return new category({
    name: `K-${faker.random.alphaNumeric(10)}`,
    budget: faker.random.number(1),
  }).save();
};

categoryMock.createMany = (howMany) => {
  return Promise.all(new Array(howMany).fill(0)
    .map(() => categoryMock.create()));
};

categoryMock.remove = () => category.remove({});