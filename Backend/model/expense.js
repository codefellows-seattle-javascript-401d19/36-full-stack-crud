'use strict';

//mongoose is the ORM to connect to mongo
const mongoose = require('mongoose');
const Category = require('./category');
const httpErrors = require('http-errors');

const expenseSchema = mongoose.Schema ({
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  price: {
    type: Number,
    maxlength: 6,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'category',
  },
});


expenseSchema.pre('save', function (done) {
  return Category.findById(this.category)
    .then(categoryFound => {
      if(!categoryFound) 
        throw httpErrors(404, 'Category not found');

      categoryFound.expenses.push(this._id);
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});

expenseSchema.post('remove', (document, done) => {
  return Category.findById(document.category)
    .then(categoryFound => {
      if (!categoryFound) 
        throw httpErrors(404, 'discipline not found');

      categoryFound.cyclists = categoryFound.cyclists.filter( cyclist => {
        return cyclist._id.toString() !== document._id.toString();
      });
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});


module.exports = mongoose.model('expense', expenseSchema);