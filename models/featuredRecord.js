import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const featuredRecordSchema = new Schema({
        album_name: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        buy_url: {
            type: String,
            required: true,
        },
        release_date: {
            type: Date,
            required: true,
        },

    },
    {
        collection: 'featureRecord',
    }
);

const FeaturedRecord = module.exports = mongoose.model('FeaturedRecord', featuredRecordSchema);
