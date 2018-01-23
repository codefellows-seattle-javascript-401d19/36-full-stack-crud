'use strict';

const faker = require('faker');
const directorMock = require('./directors-mock');
const showModel = require('../../model/shows');


const showMock = module.exports = {};

showMock.create = () => {
  let mock = {};

  return directorMock.create()
    .then(director => {
      mock.directors = director;

      return new showModel({
        title : faker.lorem.words(7),
        synopsis : faker.lorem.words(100),
        director : director._id,
      }).save();
    })
    .then(show => {
      mock.show = show;
      return mock;
    });
};

showMock.createMany = (amountToMake) => {
  let mock = {};

  return directorMock.create()
    .then(director => {
      mock.director = director;
      return Promise.all(new Array(amountToMake)
        .fill(0)
        .map(() => {
          return new showModel({
            title : faker.lorem.words(7),
            synopsis : faker.lorem.words(100),
            director : director._id,
          }).save();
        }));
    })
    .then(shows => {
      mock.shows = shows;
      return mock;
    });
};

showMock.remove = () => Promise.all([
  showModel.remove({}),
  directorMock.remove(),
]);