'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../models/index');

var _constant = require('../tools/constant');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// login
router.post('/login', (req, res) => {
  const data = {
    response: req.body.response,
    secret: _constant.RECAPTCHA_SECRET_KEY
  };
  _request2.default.post({ url: _constant.GOOGLE_RECAPTCHA_API, form: data }, (err, httpResponse, body) => {
    if (!err && res.statusCode == 200) {
      if (JSON.parse(body).success) {
        const tokenObj = {
          email: req.body.email
        };
        try {
          _index.User.findOne({
            email: req.body.email
          }, (err, user) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: 'Server Error!'
              });
            } else {
              _index.User.findOne({
                email: req.body.email,
                password: (0, _constant.MD5)(req.body.password + _constant.MD5_SUFFIX)
              }, (err, user) => {
                if (user !== null) {
                  let token = _jsonwebtoken2.default.sign(tokenObj, _constant.SECRET_KEY, {
                    expiresIn: 60 * 60 * 24
                  });
                  return res.status(200).json({
                    success: true,
                    message: 'success',
                    token: token,
                    expires_date: new Date().getTime() + 60 * 60 * 24 * 1000
                  });
                } else {
                  res.status(401).json({
                    success: false,
                    message: 'Email and password do not match'
                  });
                }
              });
            }
          });
        } catch (e) {
          res.status(500).json({
            success: false,
            message: 'server error'
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: JSON.parse(body)['error-codes'][0]
        });
      }
    }
  });
});

router.post('/modifyPassword', async (req, res) => {
  try {
    await _index.User.findOne({
      email: req.body.email,
      password: (0, _constant.MD5)(req.body.old_password + _constant.MD5_SUFFIX)
    }, async (err, user) => {
      if (user !== null) {
        await _index.User.findOneAndUpdate({
          _id: user._id
        }, {
          $set: {
            password: (0, _constant.MD5)(req.body.new_password + _constant.MD5_SUFFIX)
          }
        }, {
          new: true
        });
        res.status(201).send({
          success: true,
          message: 'Password has been modified!'
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Email and password do not match'
        });
      }
    });
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = router;