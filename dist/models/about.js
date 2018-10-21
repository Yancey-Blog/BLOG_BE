'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const aboutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    }

}, {
    collection: 'about'
});

const About = module.exports = _mongoose2.default.model('About', aboutSchema);