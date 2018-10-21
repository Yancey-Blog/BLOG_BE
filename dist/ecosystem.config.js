'use strict';

module.exports = {
  apps: [{
    name: 'API',
    script: 'app.js',

    "exec_interpreter": "babel-node",
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'caddy',
      host: '74.120.172.16',
      ref: 'origin/master',
      repo: 'git@github.com:Yancey-Blog/BLOG_BE.git',
      path: '/var/www/blog/BLOG_BE/',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      "ssh_options": "StrictHostKeyChecking=no"
    }
  }
};