'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/yanceyMusic', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.YanceyMusic.find({}).sort({ _id: -1 });
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
});

router.post('/yanceyMusic', (req, res, next) => {
  try {
    _index.YanceyMusic.create(req.body, (err, YanceyMusic) => {
      err ? res.json(err) : res.status(200).json(YanceyMusic);
    });
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/yanceyMusic/:id', async (req, res) => {
  try {
    const result = await _index.YanceyMusic.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        title: req.body.title,
        cover: req.body.cover,
        soundCloud_url: req.body.soundCloud_url,
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

router.delete('/yanceyMusic/:id', async (req, res) => {
  try {
    const result = await _index.YanceyMusic.findOneAndRemove({
      _id: req.params.id
    });
    return res.status(204).json(result);
  } catch (e) {
    return res.status(404).send('404 Not Found');
  }
});

/* batch delete covers*/
router.post('/batchYanceyMusic', async (req, res) => {
  try {
    const result = await _index.YanceyMusic.remove({ _id: { $in: req.body.selectedList } });
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