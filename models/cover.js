import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const coverSchema = new Schema({
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    upload_date: {
      type: Date,
      default: Date.now
    },
    show: {
      type: Boolean,
      required: true,
    }
  },
  {
    collection: 'cover',
  }
);

const Cover = module.exports = mongoose.model('Cover', coverSchema);
