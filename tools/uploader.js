const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const OSS = require('ali-oss');
import {ALI_OSS_ACCESS_KEY_ID, ALI_OSS_ACCESS_KEY_SECRET, ALI_OSS_BUCKET, ALI_OSS_REGION} from '../tools/constant';

const client = new OSS({
  region: ALI_OSS_REGION,
  accessKeyId: ALI_OSS_ACCESS_KEY_ID,
  accessKeySecret: ALI_OSS_ACCESS_KEY_SECRET,
  bucket: ALI_OSS_BUCKET
});

router.post('/uploads', (req, res, next) => {

  const form = new formidable.IncomingForm();
  // form.uploadDir = './public/images_backup';
  form.keepExtensions = true;
  form.maxFieldsSize = 15 * 1024 * 1024;
  form.maxFileSize = 15 * 1024 * 1024;
  form.multiples = true;
  form.hash = 'md5';
  form.parse(req, async (error, fields, files) => {
    if (error) {
      throw error;
    }
    client.useBucket('yancey-assets');
    try {
      if (files.avatar) {
        const result = await client.put(files.avatar.name, files.avatar.path);
        res.status(200).json({path: result.url.slice(5)});
      } else {
        const result = await client.put(files.file.name, files.file.path);
        res.status(200).json({path: result.url.slice(5)});
      }
    } catch (err) {
      return err
    }
  });
});

module.exports = router;
