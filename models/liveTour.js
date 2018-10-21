import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const liveTourSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        poster: {
            type: String,
            required: true,
        },
        upload_date: {
            type: Date,
            default: Date.now
        },

    },
    {
        collection: 'liveTour',
    }
);

const LiveTour = module.exports = mongoose.model('LiveTour', liveTourSchema);
