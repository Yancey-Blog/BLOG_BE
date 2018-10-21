import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mottoSchema = new Schema({
        content: {
            type: String,
            required: true,
        },
        upload_date: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: 'motto',
    }
);

const Motto = module.exports = mongoose.model('Motto', mottoSchema);
