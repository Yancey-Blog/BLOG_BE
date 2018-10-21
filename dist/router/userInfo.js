'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/userInfo', async (req, res, next) => {
  try {
    const result = await _index.UserInfo.find({}).sort({ _id: -1 });
    return res.status(200).json(result[0]);
  } catch (e) {
    return res.json(e.message);
  }
});

router.post('/userInfo', (req, res, next) => {
  try {
    _index.UserInfo.create(req.body, (err, UserInfo) => {
      if (err) {
        return res.json(err);
      } else {
        return res.status(200).json(UserInfo);
      }
    });
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/userInfo/:id', async (req, res) => {
  try {
    const result = await _index.UserInfo.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        user_name: req.body.user_name,
        position: req.body.position,
        self_introduction: req.body.self_introduction,
        city: req.body.city,
        avatar: req.body.avatar
      }
    }, {
      new: true
    });
    return res.status(201).send(result);
  } catch (e) {
    return res.json(e.message);
  }
});

module.exports = router;