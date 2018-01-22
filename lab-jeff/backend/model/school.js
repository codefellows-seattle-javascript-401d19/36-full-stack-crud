'use strict';

const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const schoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
    state: {
      type: String,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
    id: {
      type: String,
      default: uuidv1(),
    },
  },
  { usePushEach: true }
);

module.exports = mongoose.model('school', schoolSchema);
