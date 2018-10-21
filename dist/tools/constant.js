'use strict';

const crypto = require('crypto');

module.exports = {
  MD5_SUFFIX: 'your_customize_salt',
  MD5: pwd => {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
  },
  SECRET_KEY: 'your_customize_secret_key',

  RECAPTCHA_SECRET_KEY: 'your_RECAPTCHA_SECRET_KEY',
  RECAPTCHA_SITE_KEY: 'your_RECAPTCHA_SITE_KEY',
  GOOGLE_RECAPTCHA_API: 'https://www.google.com/recaptcha/api/siteverify',

  BANDWAGON_SECRET_KEY: 'your_BANDWAGON_SECRET_KEY',
  BANDWAGON_SERVER_ID: 'your_BANDWAGON_SERVER_ID',
  BANDWAGON_BASE_URL: 'https://api.64clouds.com/v1/',

  ALI_OSS_REGION: 'your_ALI_OSS_REGION',
  ALI_OSS_ACCESS_KEY_ID: 'your_ALI_OSS_ACCESS_KEY_ID',
  ALI_OSS_ACCESS_KEY_SECRET: 'your_ALI_OSS_ACCESS_KEY_SECRET',
  ALI_OSS_BUCKET: 'your_ALI_OSS_BUCKET'
};