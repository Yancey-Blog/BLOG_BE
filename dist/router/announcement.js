'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/announcements', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Announcement.find({}).sort({ _id: -1 });
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
});

router.get('/latestAnnouncements', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Announcement.find({}).limit(1).sort({ _id: -1 });
    return res.status(200).json(result[0]);
  } catch (e) {
    return next(e);
  }
});

router.post('/announcements', (req, res, next) => {
  try {
    _index.Announcement.create(req.body, (err, Announcement) => {
      err ? res.json(err) : res.status(200).json(Announcement);
    });
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/announcements/:id', async (req, res) => {
  try {
    const result = await _index.Announcement.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        content: req.body.content
      }
    }, {
      new: true
    });
    res.status(201).send(result);
  } catch (e) {
    res.json(e.message);
  }
});

router.delete('/announcements/:id', async (req, res) => {
  try {
    const result = await _index.Announcement.findOneAndRemove({
      _id: req.params.id
    });
    return res.status(204).json(result);
  } catch (e) {
    return res.status(404).send('404 Not Found');
  }
});

/* batch delete covers*/
router.post('/batchAnnouncements', async (req, res) => {
  try {
    const result = await _index.Announcement.remove({ _id: { $in: req.body.selectedList } });
    if (result.n === 0) {
      return res.status(404).send('404 Not Found');
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

module.exports = router;