'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const userInfoScheme = new Schema({
    user_name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    self_introduction: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }

}, {
    collection: 'userInfo'
});

const UserInfo = module.exports = _mongoose2.default.model('UserInfo', userInfoScheme);