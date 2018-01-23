'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: () => new Date(),
  },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'expense'}],
}, {
  usePushEach: true,
});

module.exports = mongoose.model('school', categorySchema);
