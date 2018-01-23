'use strict';

const mongoose = require('mongoose');
const category = require('./category');
const httpErrors = require('http-errors');

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'category',
  },
});

//------------------------ RELATIONSHIP MANAGEMENT ------------------------
expenseSchema.pre('save', function(done){
  return category.findById(this.category)
    .then(categoryFound => {
      if(!categoryFound)
        throw httpErrors(404, 'category not found');
      categoryFound.expenseNames.push(this._id);
      return categoryFound.save();
    })
    .then(() => done()) //need to make a function to make sure we dont pass anything into the done() as the done() is expecting (error, args)
    .catch(done);
});

expenseSchema.post('remove', (document, done) => {
  return category.findById(document.category)
    .then(categoryFound => {
      if (!categoryFound)
        throw httpErrors(404, 'category not found');
      categoryFound.expenseNames = categoryFound.expenseNames.filter(expense => {
        return expense._id.toString() !== document._id.toString();
      });
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('expense', expenseSchema);