'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  introduction: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  upload_date: {
    type: Date,
    default: Date.now
  }

}, {
  collection: 'project'
});

const Project = module.exports = _mongoose2.default.model('Project', projectSchema);