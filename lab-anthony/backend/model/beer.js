'use strict';

const mongoose = require('mongoose');
const Category = require('./category');
const httpErrors = require('http-errors');

const beerSchema = mongoose.Schema({
  name: {type: String, required: true,  unique: true},
  style: {type: String, required: true, minlength: 1},
  abv: {type: String, required: false, minlength: 1},
  timestamp: {type: Date, default: () => new Date()},
  category : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'brewerie',
  },
});

beerSchema.pre('save', function(done){
  console.log('saving beer');
  return Category.findById(this.category)
    .then(categoryFound => {
      console.log('categoryfound', categoryFound);
      if(!categoryFound)
        throw httpErrors(404, 'category not found');

      categoryFound.beers.push(this._id);
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});

beerSchema.post('remove', (document, done) => {
  return Category.findById(document.category)
    .then(categoryFound => {
      if(!categoryFound)
        throw httpErrors(404,'category not found');
      categoryFound.beers = categoryFound.beers.filter(beer => {
        return beer._id.toString() !== document._id.toString();
      });
      return breweryFound.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('beer', beerSchema);
