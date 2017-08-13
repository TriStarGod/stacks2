const mongoose = require('mongoose');
// Schema is model of what an object should contain
const Schema = mongoose.Schema;
const Types = Schema.Types;
// initialize schema called user with properties
const Alarm = new Schema({
  _userId: {
    type: Types.ObjectId,
    required: true,
  },
  due: {
    type: Types.Date,
    required: true,
  },
  cycle: {
    type: Types.String,
    default: '',
  },
  inactive: {
    type: Types.Boolean,
    default: false,
  },
  _taskId: {
    type: Types.ObjectId,
    required: true,
  },
  _otherId: {
    type: Types.ObjectId,
    required: true,
  },
});

// exports model for use elsewhere
module.exports = mongoose.model('TaskTemplate', Alarm);
