const mongoose = require('mongoose');
// Schema is model of what an object should contain
const Schema = mongoose.Schema;
const Types = Schema.Types;
// initialize schema called user with properties
const TaskTemplate = new Schema({
  _userId: {
    type: Types.ObjectId,
    required: true,
  },
  modified: {
    type: Types.Date,
    required: true,
  },
  inactive: {
    type: Types.Boolean,
    default: false,
  },
  doneN: {
    type: Types.String,
    default: 'Done',
    required: true,
  },
  descN: {
    type: Types.String,
    default: 'Description',
    required: true,
  },
  otherT: [{
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    order: {
      type: Types.Number,
      default: 0,
      required: true,
    },
    name: {
      type: Types.String,
      required: true,
    },
    inactive: {
      type: Types.Boolean,
      default: false,
    },
  }],
});

// exports model for use elsewhere
module.exports = mongoose.model('TaskTemplate', TaskTemplate);
