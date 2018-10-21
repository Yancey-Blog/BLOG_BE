'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/covers', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Cover.find({}).sort({ _id: -1 });
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
});

/* get a cover by id*/
router.get('/covers/:id', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    // if you want to switch a previous cover
    if (req.query.position === 'prev') {
      // get the previous cover by current id if it can be shown
      const result = await _index.Cover.find({ '_id': { "$lt": req.params.id }, show: { $ne: false } }).limit(1).sort({ _id: -1 });
      // if the current cover is the first cover
      if (result.length === 0) {
        // show the last cover and it can be shown
        const result = await _index.Cover.find({ show: { $ne: false } }).limit(1).sort({ _id: -1 });
        return res.status(200).json(result[0]);
      } else {
        return res.status(200).json(result[0]);
      }
    } else if (req.query.position === 'next') {
      const result = await _index.Cover.find({ '_id': { "$gt": req.params.id }, show: { $ne: false } }).limit(1).sort({ _id: 1 });
      if (result.length === 0) {
        const result = await _index.Cover.find({ show: { $ne: false } }).limit(1).sort({ _id: 1 });
        return res.status(200).json(result[0]);
      } else {
        return res.status(200).json(result[0]);
      }
    } else {
      // get a cover when open the home page
      // if id is not in localStorage
      if (req.params.id === '0') {
        // show the latest cover
        const result = await _index.Cover.find({ show: { $ne: false } }).limit(1).sort({ _id: -1 });
        return res.status(200).json(result[0]);
      } else {
        const result = await _index.Cover.find({ _id: req.params.id, show: { $ne: false } });
        // if this id of cover can not be shown or had already been deleted
        if (result.length === 0) {
          // show the latest cover
          const result = await _index.Cover.find({ show: { $ne: false } }).limit(1).sort({ _id: -1 });
          return res.status(200).json(result[0]);
        } else {
          return res.status(200).json(result[0]);
        }
      }
    }
  } catch (e) {
    return next(e);
  }
});

/* insert a new cover */
router.post('/covers', (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    _index.Cover.create(req.body, (err, cover) => {
      err ? res.json(err) : res.json(cover);
    });
  } catch (e) {
    next(e);
  }
});

/* whether to show a cover */
router.put('/covers/:id', async (req, res) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Cover.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        name: req.body.name,
        url: req.body.url,
        show: req.body.show
      }
    }, {
      new: true
    });
    res.status(201).send(result);
  } catch (e) {
    res.json(e.message);
  }
});

router.put('/covers/show/:id', async (req, res) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Cover.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        show: req.body.show
      }
    }, {
      new: true
    });
    res.status(201).send(result);
  } catch (e) {
    res.json(e.message);
  }
});

router.delete('/covers/:id', async (req, res) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Cover.findOneAndRemove({
      _id: req.params.id
    });
    return res.status(204).json(result);
  } catch (e) {
    return res.status(404).send('404 Not Found');
  }
});

/* batch delete covers*/
router.post('/batchCovers', async (req, res) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Cover.remove({ _id: { $in: req.body.selectedList } });
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