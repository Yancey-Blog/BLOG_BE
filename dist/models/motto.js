'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const mottoSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'motto'
});

const Motto = module.exports = _mongoose2.default.model('Motto', mottoSchema);