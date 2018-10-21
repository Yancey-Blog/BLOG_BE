'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const globalStatusScheme = new Schema({
    full_site_gray: {
        type: Boolean,
        required: true
    }
}, {
    collection: 'globalStatus'
});

const GlobalStatus = module.exports = _mongoose2.default.model('GlobalStatus', globalStatusScheme);