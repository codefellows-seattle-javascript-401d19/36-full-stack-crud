'use strict';

//mongoose is the ORM to connect to mongo
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 15,
  },
  budget: {
    type: Number,
    required: true,
    maxlength: 15,
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'expense'}],
  timestamp: {
    type: Date,
    default: () => new Date(),
  }, 
},
{
  usePushEach: true,
});

//internally, this becomes 'disciplines' Mongoose adds an S, so this must be accounted for.  

//A more explicit example is category, which must have its reference defined as 'categorie' since Mongoose will render it as 'categories';

module.exports = mongoose.model('categorie', categorySchema);