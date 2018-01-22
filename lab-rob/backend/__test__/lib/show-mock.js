'use strict';

const Show = require('../../model/show');
const faker = require('faker');

const showMock = module.exports = {};

showMock.create = () => {
  return new Show({
    title: faker.random.word() + Math.random(),
    seasons: faker.random.number(20),
    releaseYear: Math.floor(Math.random() * 57) + 1960,
    ongoing: faker.random.boolean(), 
  }).save();
};

showMock.createMany = num => {
  let shows = new Array(num);
  return Promise.all(shows.fill(0).map(() => showMock.create()));
};

showMock.remove = () => {
  return Show.remove({});
};