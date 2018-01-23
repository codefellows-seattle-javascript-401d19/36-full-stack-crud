'use strict';

const faker = require('faker');
const categoryMock = require('./category-mock');
const Expense = require('../../model/cyclist');

const cyclistMock = module.exports = {};

cyclistMock.create = () => {
  let mock = {};

  return categoryMock.create()
    .then(category => {
      mock.category = category;

      return new Expense({
        name: faker.name.firstName(2),
        age: faker.random.number({min: 20, max: 40}),
        eventsEntered: faker.random.number({min: 5, max:50}),
        category: category._id,
      }).save();
    })
    .then(cyclist => {
      mock.cyclist = cyclist;
      return mock;
    });
};

cyclistMock.createMany = (howMany) => {
  let mock = {};

  return categoryMock.create()
    .then(category => {
      mock.category = category;
      return Promise.all(new Array (howMany)
        .fill(0)
        .map(() => {
          return new Cyclist({
            name: faker.lorem.words(2),
            age: faker.random.number({min: 20, max: 40}),
            eventsEntered: faker.random.number({ min: 5, max: 50 }),
            category: category._id,
          }).save();
        }));
    })
    .then(cyclists => {
      mock.cyclists = cyclists;
      return mock;
    });
};

cyclistMock.remove = () => Promise.all([
  Cyclist.remove({}),
  categoryMock.remove(),

]);