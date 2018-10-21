'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const playerSchema = new Schema({
    title: {
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
    music_file_url: {
        type: String,
        required: true
    },
    lrc: {
        type: String,
        required: false
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
    collection: 'player'
});

const Player = module.exports = _mongoose2.default.model('Player', playerSchema);