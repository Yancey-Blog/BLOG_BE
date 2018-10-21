import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        introduction: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        release_date: {
            type: Date,
            required: true,
        },

    },
    {
        collection: 'about',
    }
);

const About = module.exports = mongoose.model('About', aboutSchema);
