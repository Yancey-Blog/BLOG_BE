import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    header_cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    like_count: {
      type: Array,
      required: false,
    },
    pv_count: {
      type: Number,
      required: false,
      default: 0,
    },
    tags: {
      type: Array,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps:
      {
        createdAt: 'publish_date',
        updatedAt: 'last_modified_date'
      }
  },
  {
    collection: 'article',
  },
);

articleSchema.index(
  {
    title: -1,
  }
);

const Article = module.exports = mongoose.model('Article', articleSchema);
