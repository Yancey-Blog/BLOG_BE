'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/featuredRecords', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.FeaturedRecord.find({}).sort({ _id: -1 });
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
});

router.get('/latestFourFeaturedRecords', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.FeaturedRecord.find({}).limit(4).sort({ _id: -1 });
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
});

router.post('/featuredRecords', (req, res, next) => {
  try {
    _index.FeaturedRecord.create(req.body, (err, FeaturedRecord) => {
      err ? res.json(err) : res.status(200).json(FeaturedRecord);
    });
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/featuredRecords/:id', async (req, res) => {
  try {
    const result = await _index.FeaturedRecord.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        album_name: req.body.album_name,
        artist: req.body.artist,
        cover: req.body.cover,
        buy_url: req.body.buy_url,
        release_date: req.body.release_date
      }
    }, {
      new: true
    });
    res.status(201).send(result);
  } catch (e) {
    res.json(e.message);
  }
});

router.delete('/featuredRecords/:id', async (req, res) => {
  try {
    const result = await _index.FeaturedRecord.findOneAndRemove({
      _id: req.params.id
    });
    return res.status(204).json(result);
  } catch (e) {
    return res.status(404).send('404 Not Found');
  }
});

/* batch delete covers*/
router.post('/batchFeaturedRecords', async (req, res) => {
  try {
    const result = await _index.FeaturedRecord.remove({ _id: { $in: req.body.selectedList } });
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