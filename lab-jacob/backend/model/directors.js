'use strict';

const mongoose = require('mongoose');

const directorSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true,
  },
  age : {
    type : Number,
    required : true,
  },
  timestamp : {
    type : Date,
    default : () => new Date(),  
  },

  shows : [{type : mongoose.Schema.Types.ObjectId,
    ref : 'show'}],

},{
  usePushEach : true,
});

module.exports = mongoose.model('director',directorSchema);