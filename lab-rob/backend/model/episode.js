'use strict';

const mongoose = require('mongoose');
const Show = require('./show');
const httpErrors = require('http-errors');

const episodeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  duration: Number,
  stars: {
    type: Number,
    min: 0,
    max: 5,
  },
  actors: [{type: String}],
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'show',
  },
});

episodeSchema.pre('save', function(done) {
  return Show.findById(this.show)
    .then(showFound => {
      if(!showFound)
        throw httpErrors(404, 'Show not found.');
      return done();
    })
    .catch(done);
});

episodeSchema.post('save', (document, done) => {
  return Show.findById(document.show)
    .then(showFound => {
      showFound.episodes.push(document._id);
      return showFound.save();
    })
    .then(() => done())
    .catch(done);
});

episodeSchema.post('remove', (document, done) => {
  return Show.findById(document.show)
    .then(showFound => {
      if(!showFound)
        throw httpErrors(404, 'Show not found.');
      showFound.episodes = showFound.episodes
        .filter(episode => episode._id.toString() !== document._id.toString());
      return showFound.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('episode', episodeSchema);