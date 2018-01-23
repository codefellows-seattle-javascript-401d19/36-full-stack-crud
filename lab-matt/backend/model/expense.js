'use strict';

const mongoose = require('mongoose');
const Category = require('./category');
const httpError = require('http-errors');

const expenseSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  uuid: {
    type: String,
    require: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),  
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'category',
  }, 
});

expenseSchema.pre('save', function(done){
  return Category.findById(this.category)
    .then(categoryFound => {
      if (!categoryFound) {
        throw httpError(404, 'no category listed');
      }
      categoryFound.expense.push(this._id);
      return categoryFound.save();
    })
    .then(() => {
      done();
    })
    .catch(done);
});

expenseSchema.post('remove', (document, done) => {
  return Category.findById(document.category)
    .then(categoryFound => {
      if (!categoryFound) {
        throw httpError(404, 'no category listed');
      }
      categoryFound.expenses = categoryFound.expenses.filter((note) => {
        return note._id.toString() !== document._id.toString();
      });
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('expense', expenseSchema);
