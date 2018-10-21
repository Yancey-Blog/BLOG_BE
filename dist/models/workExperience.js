'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const workExperienceSchema = new Schema({
    enterprise_name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    in_service: {
        type: Array,
        required: true
    },
    work_content: {
        type: String,
        required: true
    },
    work_technology_stack: {
        type: Array,
        required: false
    }
}, {
    collection: 'workExperience'
});

const WorkExperience = module.exports = _mongoose2.default.model('WorkExperience', workExperienceSchema);