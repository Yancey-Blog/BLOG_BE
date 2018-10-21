import express from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/index';
import {MD5_SUFFIX, MD5, SECRET_KEY, RECAPTCHA_SECRET_KEY, GOOGLE_RECAPTCHA_API} from '../tools/constant';
import request from 'request';

const router = express.Router();

// login
router.post('/login', (req, res) => {
  const data = {
    response: req.body.response,
    secret: RECAPTCHA_SECRET_KEY,
  };
  request.post({url: GOOGLE_RECAPTCHA_API, form: data}, (err, httpResponse, body) => {
    if (!err && res.statusCode == 200) {
      if (JSON.parse(body).success) {
        const tokenObj = {
          email: req.body.email,
        };
        try {
          User.findOne({
            email: req.body.email,
          }, (err, user) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: 'Server Error!',
              });
            } else {
              User.findOne({
                email: req.body.email,
                password: MD5(req.body.password + MD5_SUFFIX),
              }, (err, user) => {
                if (user !== null) {
                  let token = jwt.sign(tokenObj, SECRET_KEY, {
                    expiresIn: 60 * 60 * 24,
                  });
                  return res.status(200).json({
                    success: true,
                    message: 'success',
                    token: token,
                    expires_date: new Date().getTime() + 60 * 60 * 24 * 1000,
                  });
                } else {
                  res.status(401).json({
                    success: false,
                    message: 'Email and password do not match',
                  });
                }
              });
            }
          })
        } catch (e) {
          res.status(500).json({
            success: false,
            message: 'server error',
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: JSON.parse(body)['error-codes'][0],
        });
      }
    }
  })
});

router.post('/modifyPassword', async (req, res) => {
  try {
    await User.findOne({
        email: req.body.email,
        password: MD5(req.body.old_password + MD5_SUFFIX),
      }, async (err, user) => {
      if (user !== null) {
        await User.findOneAndUpdate({
            _id: user._id
          },
          {
            $set: {
              password:  MD5(req.body.new_password + MD5_SUFFIX),
            }
          }, {
            new: true,
          });
        res.status(201).send({
          success: true,
          message: 'Password has been modified!',
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Email and password do not match',
        });
      }
    });
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = router;

