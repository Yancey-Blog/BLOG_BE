import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'user',
    }
);

const User = module.exports = mongoose.model('User', userSchema);
