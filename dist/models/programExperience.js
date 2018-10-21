'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const programExperienceSchema = new Schema({
    program_name: {
        type: String,
        required: true
    },
    program_url: {
        type: String,
        required: true
    },
    program_content: {
        type: String,
        required: true
    },
    program_technology_stack: {
        type: Array,
        required: false
    }
}, {
    collection: 'programExperience'
});

const ProgramExperience = module.exports = _mongoose2.default.model('ProgramExperience', programExperienceSchema);