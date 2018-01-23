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
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'category',
  },
});

expenseSchema.pre('save', function(done) {
  return Category.findById(this.categoryId)
    .then(categoryFound => {
      if (!categoryFound) {
        throw httpErrors(404, 'category not found');
      }

      categoryFound.expenses.push(this._id);
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});

expenseSchema.post('remove', (document, done) => {
  return Category.findById(document.categoryId)
    .then(categoryFound => {
      if (!categoryFound) {
        throw httpErrors(404, 'category not found');
      }

      categoryFound.expenses = categoryFound.expenses.filter(expense => {
        return expense._id.toString() !== document._id.toString();
      });
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('expense', expenseSchema);
