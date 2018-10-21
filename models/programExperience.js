import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const programExperienceSchema = new Schema({
        program_name: {
            type: String,
            required: true,
        },
        program_url: {
            type: String,
            required: true,
        },
        program_content: {
            type: String,
            required: true,
        },
        program_technology_stack: {
            type: Array,
            required: false,
        },
    },
    {
        collection: 'programExperience',
    }
);

const ProgramExperience = module.exports = mongoose.model('ProgramExperience', programExperienceSchema);
