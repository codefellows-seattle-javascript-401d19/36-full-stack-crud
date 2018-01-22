'use strict';

const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  seasons: {
    type: Number,
    required: true,
  },
  releaseYear: Number,
  ongoing: Boolean,
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  episodes: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'episode',
    },
  ],
}, {
  usePushEach: true,
});

module.exports = mongoose.model('show', showSchema);