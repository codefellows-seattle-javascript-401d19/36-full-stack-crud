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
        title : faker.company.bsNoun(2),
        year : 2017,
      
        languages : faker.database.engine(3),
      
        description : faker.company.catchPhrase(10).split(' '),
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
            title : faker.company.bsNoun(2),
            year : faker.date.soon,
            
            languages : faker.database.engine(3).split(' '),
            
            description : faker.company.catchPhrase(10).split(' '),
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