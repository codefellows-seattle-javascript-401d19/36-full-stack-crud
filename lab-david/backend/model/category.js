'use strict';

const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  age : {
    type : Number,
  },
  timeStamp : {type : Date,
    default : () => new Date() },
  projects : [{type: mongoose.Schema.Types.ObjectId,
    ref : 'expense'}],
},{
  usePushEach : true,
});

module.exports = mongoose.model('category', categorySchema);