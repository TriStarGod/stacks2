const mongoose = require('mongoose');
// Schema is model of what an object should contain
const Schema = mongoose.Schema;
const Types = Schema.Types;

// initialize schema called user with properties
const Task = new Schema({
  _parentId: {
    type: Types.ObjectId,
    default: '0',
  },
  _userId: {
    type: Types.ObjectId,
    default: '0',
  },
  _taskTemplateId: {
    type: Types.ObjectId,
    default: '0',
  },
  done: {
    type: Types.Boolean,
    default: false,
  },
  desc: {
    type: Types.String,
    required: true,
  },
  modified: {
    type: Types.Date,
    default: Date.now,
  },
  other: [{
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    data: Types.String,
  }],
});

// exports model for use elsewhere
module.exports = mongoose.model('Task', Task);
