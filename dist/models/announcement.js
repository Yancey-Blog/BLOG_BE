'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const announcementSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'announcement'
});

const Announcement = module.exports = _mongoose2.default.model('Announcement', announcementSchema);