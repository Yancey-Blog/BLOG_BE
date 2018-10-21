import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const workExperienceSchema = new Schema({
        enterprise_name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        in_service: {
            type: Array,
            required: true,
        },
        work_content: {
            type: String,
            required: true,
        },
        work_technology_stack: {
            type: Array,
            required: false,
        },
    },
    {
        collection: 'workExperience',
    }
);

const WorkExperience = module.exports = mongoose.model('WorkExperience', workExperienceSchema);
