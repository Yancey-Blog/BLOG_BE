import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const globalStatusScheme = new Schema({
        full_site_gray: {
            type: Boolean,
            required: true,
        },
    },
    {
        collection: 'globalStatus',
    }
);

const GlobalStatus = module.exports = mongoose.model('GlobalStatus', globalStatusScheme);
