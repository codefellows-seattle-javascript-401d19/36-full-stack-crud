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
        name: `KP-${faker.random.alphaNumeric(7)}`,
        content: faker.lorem.words(10),
        category: category._id,
      }).save();
    })
    .then(expense => {
      mock.expense = expense;
      return mock;
    });
};

expenseMock.createMany = (howMany) => {
  let mock = {};

  return categoryMock.create()
    .then(category => {
      mock.category = category;
      return Promise.all(new Array(howMany)
        .fill(0)
        .map(() => {
          return new Expense({
            name: `KP-${faker.random.alphaNumeric(7)}`,
            content: faker.lorem.words(10),
            category: category._id,
          }).save();
        }));
    })
    .then(expenses => {
      mock.expenses = expenses;
      return mock;
    });
};

expenseMock.remove = () => Promise.all([
  Expense.remove({}),
  categoryMock.remove(),
]);