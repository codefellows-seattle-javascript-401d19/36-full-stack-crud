'use strict';

const faker = require('faker');
const categoryMock = require('./category-mock');
const Expense = require('../../model/expense');

const expenseMock = module.exports = {};

expenseMock.create = () => {
  let mock = {};

  return categoryMock.create()
    .then(category => {
      mock.category = category;

      return new Expense({
        name : faker.lorem.words(2),
        price : faker.random.number(1),
        category : category._id,
      }).save();
    })
    .then(expense => {
      mock.expense = expense;
      return mock;
    });
};

expenseMock.createMany = (creationCount) => {
  let mock = {};
  
  return categoryMock.create()
    .then(category => {
      mock.category = category;
  
      return Promise.all(new Array(creationCount)
        .fill(0)
        .map(() => {
          return new Expense({
            name : faker.lorem.words(2),
            price : faker.random.number(1),
            category : category._id,
          }).save();
        }));
    })
    .then(expense => {
      mock.expense = expense;
      return expense;
    });
};

expenseMock.remove = () => Promise.all([
  Expense.remove({}),
  categoryMock.remove(),
]);