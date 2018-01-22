'use strict';

const Episode = require('../../model/episode');
const faker = require('faker');
const showMock = require('./show-mock');

const episodeMock = module.exports = {};

episodeMock.create = () => {
  let mock = {};
  return showMock.create()
    .then(show => {
      mock.show = show;
      return new Episode({
        name: faker.random.words(7),
        number: Math.ceil(Math.random() * 15 + 5),
        duration: Math.ceil(Math.random() * 30 + 30),
        stars: Math.floor(Math.random() * 6),
        actors: new Array(parseInt(Math.random() * 10)).fill(0).map(() => faker.random.words(2)),
        show: show._id,
      }).save();
    })
    .then(episode => {
      mock.episode = episode;
      return mock;
    }).catch(console.log);
};

episodeMock.createMany = num => {
  let mock = {};
  return showMock.create()
    .then(show => {
      mock.show = show;
      return Promise.all(
        new Array(num).fill(0).map(() => {
          return new Episode({
            name: faker.random.words(7),
            number: Math.ceil(Math.random() * 15 + 5),
            duration: Math.ceil(Math.random() * 30 + 30),
            stars: Math.floor(Math.random() * 6),
            actors: new Array(parseInt(Math.random() * 10)).fill(0).map(() => faker.random.words(2)),
            show: show._id,
          }).save();
        })
      );
    })
    .then(episodes => {
      mock.episodes = episodes;
      return mock;
    }).catch(console.log);
};

episodeMock.remove = () => {
  return Episode.remove({})
    .then(() => {
      return showMock.remove();
    });
};