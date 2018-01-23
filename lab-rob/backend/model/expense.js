'use strict';

const mongoose = require('mongoose');
const Category = require('./category');
const httpErrors = require('http-errors');

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'category',
  },
});

expenseSchema.pre('save', function(done) {
  return Category.findById(this.category)
    .then(categoryFound => {
      if(!categoryFound)
        throw httpErrors(404, 'Category not found.');
      return done();
    })
    .catch(done);
});

expenseSchema.post('save', (document, done) => {
  return Category.findById(document.category)
    .then(categoryFound => {
      categoryFound.expenses.push(document._id);
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});

expenseSchema.post('remove', (document, done) => {
  return Category.findById(document.category)
    .then(categoryFound => {
      if(!categoryFound)
        throw httpErrors(404, 'Category not found.');
      categoryFound.expenses = categoryFound.expenses
        .filter(episode => episode._id.toString() !== document._id.toString());
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('expense', expenseSchema);