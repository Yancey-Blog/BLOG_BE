import express from 'express';
import { YanceyMusic } from '../models/index';

const router = express.Router();

router.get('/yanceyMusic', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime(),
    });
    const result = await YanceyMusic.find({}).sort({_id: -1});
    return res.status(200).json(result);
  } catch (e) {
    return next(e)
  }
});

router.post('/yanceyMusic', (req, res, next) => {
  try {
    YanceyMusic.create(req.body, (err, YanceyMusic) => {
      err ? res.json(err) : res.status(200).json(YanceyMusic);
    })
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/yanceyMusic/:id', async (req, res) => {
  try {
    const result = await YanceyMusic.findOneAndUpdate({
        _id: req.params.id
      },
      {
        $set: {
            title: req.body.title,
            cover: req.body.cover,
            soundCloud_url: req.body.soundCloud_url,
            release_date: req.body.release_date,
        }
      }, {
        new: true,
      });
    res.status(201).send(result);
  } catch (e) {
    res.json(e.message);
  }
});

router.delete('/yanceyMusic/:id', async (req, res) => {
  try {
    const result = await YanceyMusic.findOneAndRemove({
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
    const result = await YanceyMusic.remove({_id: {$in: req.body.selectedList}});
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

