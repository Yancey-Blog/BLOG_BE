'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const featuredRecordSchema = new Schema({
    album_name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    buy_url: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    }

}, {
    collection: 'featureRecord'
});

const FeaturedRecord = module.exports = _mongoose2.default.model('FeaturedRecord', featuredRecordSchema);