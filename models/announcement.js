import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
        content: {
            type: String,
            required: true,
        },
        upload_date: {
          type: Date,
          default: Date.now,
        },
    },
    {
        collection: 'announcement',
    }
);

const Announcement = module.exports = mongoose.model('Announcement', announcementSchema);
