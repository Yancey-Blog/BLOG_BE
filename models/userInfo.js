import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userInfoScheme = new Schema({
        user_name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        self_introduction: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },

    },
    {
        collection: 'userInfo',
    }
);

const UserInfo = module.exports = mongoose.model('UserInfo', userInfoScheme);
