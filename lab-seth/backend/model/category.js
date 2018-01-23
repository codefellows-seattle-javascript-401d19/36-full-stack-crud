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
    default: 0,
  },
  period: {
    type: String,
    default: 'month',
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId, //needs to be an array to that expense id's can be pushed into here from expenses.js model
    required: true,
    ref: 'expense'}],
},{
  usePushEach: true,
});

module.exports = mongoose.model('category', categorySchema);