import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const yanceyMusicSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        soundCloud_url: {
            type: String,
            required: true,
        },
        release_date: {
            type: Date,
            required: true,
        },

    },
    {
        collection: 'yanceyMusic',
    }
);

const YanceyMusic = module.exports = mongoose.model('YanceyMusic', yanceyMusicSchema);
