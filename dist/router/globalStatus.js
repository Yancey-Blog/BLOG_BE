'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/globalStatus', async (req, res, next) => {
  try {
    const result = await _index.GlobalStatus.find({}).sort({ _id: -1 });
    return res.status(200).json(result[0]);
  } catch (e) {
    return res.json(e.message);
  }
});

router.post('/fullSiteGray', (req, res, next) => {
  try {
    _index.GlobalStatus.create(req.body, (err, UserInfo) => {
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

router.put('/fullSiteGray/:id', async (req, res) => {
  try {
    const result = await _index.GlobalStatus.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        full_site_gray: req.body.full_site_gray
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