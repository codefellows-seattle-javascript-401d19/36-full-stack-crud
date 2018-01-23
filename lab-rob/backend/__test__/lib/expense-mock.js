'use strict';

const faker = require('faker');
const Expense = require('../../model/expense');
const categoryMock = require('./category-mock');

const expenseMock = module.exports = {};

expenseMock.create = () => {
  let mock = {};
  return categoryMock.create()
    .then(category => {
      mock.category = category;
      return new Expense({
        name: faker.random.words(7),
        price: Math.random() * 60 + 5,
        category: category._id,
      }).save();
    })
    .then(expense => {
      mock.expense = expense;
      return mock;
    }).catch(console.log);
};

expenseMock.createMany = num => {
  let mock = {};
  return categoryMock.create()
    .then(category => {
      mock.category = category;
      return Promise.all(
        new Array(num).fill(0).map(() => {
          return new Expense({
            name: faker.random.words(7),
            price:Math.random() * 60 + 5,
            category: category._id,
          }).save();
        })
      );
    })
    .then(expenses => {
      mock.expenses = expenses;
      return mock;
    }).catch(console.log);
};

expenseMock.remove = () => {
  return Expense.remove({})
    .then(() => {
      return categoryMock.remove();
    });
};