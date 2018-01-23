'use strict';

const mongoose = require('mongoose');
const directorsModel = require('./directors');
const httpErrors = require('http-errors');

const showsSchema = mongoose.Schema({
  title : {
    type : String,
    required : true,
    unique : true,
  },
  synopsis : {
    type : String,
    required : true,
    minlength : 5,
  },
  timestamp : {
    type : Date,
    default : () => new Date(),
  },
  director : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'director',
  },
});

showsSchema.pre('save',function(done){

  return directorsModel.findById(this.director)
    .then(directorFound => {
      if(!directorFound)
        throw httpErrors(404,'director not found');
      
      directorFound.shows.push(this._id);
      return directorFound.save();
    })
    .then(() => done())
    .catch(done);
});

showsSchema.post('remove',(document,done) => {
  return directorsModel.findById(document.director)
    .then(directorFound => {
      if(!directorFound)
        throw httpErrors(404,'director not found');
      
      directorFound.shows = directorFound.shows.filter(shows => {
        return shows._id.toString() !== document._id.toString();
      });
      return directorFound.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('show',showsSchema);