'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const coverSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  upload_date: {
    type: Date,
    default: Date.now
  },
  show: {
    type: Boolean,
    required: true
  }
}, {
  collection: 'cover'
});

const Cover = module.exports = _mongoose2.default.model('Cover', coverSchema);