'use strict';

const mongoose = require('mongoose');
const Category = require('./category');
const httpErrors = require('http-errors');

const expenseSchema = mongoose.Schema({
  title : {
    type: String,
    required: true,
    unique: true,
  },
  year : {
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
  return Expense.findById(this.category)
    .then(expenseLocated => {
      if(!expenseLocated)
        throw httpErrors(404, 'category not found');

      expenseLocated.expenses.push(this._id);
      return expenseLocated.save();
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