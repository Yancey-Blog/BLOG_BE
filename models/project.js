import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    upload_date: {
      type: Date,
      default: Date.now
    },

  },
  {
    collection: 'project',
  }
);

const Project = module.exports = mongoose.model('Project', projectSchema);
