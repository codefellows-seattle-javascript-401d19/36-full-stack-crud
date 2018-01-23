'use strict';

const mongoose = require('mongoose');
const Category = require('./category');
const httpErrors = require('http-errors');

const expenseSchema = mongoose.Schema({
  name : {
    type: String,
    required: true,
    unique: true,
  },
  price : {
    type : Number,
    required : true,
  },

  languages : [{type : String }],

  description : {type : String},
   
  category : {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'category',
  },
});

expenseSchema.pre('save', function(done){
  return Category.findById(this.category)
    .then(categoryLocated => {
      if(!categoryLocated)
        throw httpErrors(404, 'category not found');

      categoryLocated.categories.push(this._id);
      return categoryLocated.save();
    })
    .then(() => done())
    .catch(done);
});

expenseSchema.post('remove', (document, done) => {
  return Category.findById(document.category)
    .then(categoryLocated => {
      if(!categoryLocated)
        throw httpErrors(404, 'category not located');

      categoryLocated.expenses = categoryLocated.expenses.filter(expense => {
        return expense._id.toString() !== document._id.toString();
      });
      return categoryLocated.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('expense', expenseSchema);