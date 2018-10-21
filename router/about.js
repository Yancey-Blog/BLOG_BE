import express from 'express';
import {About} from '../models/index';

const router = express.Router();

router.get('/abouts', async (req, res, next) => {
  try {
    const result = await About.find({}).sort({_id: -1});
    return res.status(200).json(result);
  } catch (e) {
    return res.json(e.message);
  }
});

router.post('/abouts', (req, res, next) => {
  try {
    About.create(req.body, (err, About) => {
      if (err) {
        return res.json(err);
      } else {
        return res.status(200).json(About);
      }
    })
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/abouts/:id', async (req, res) => {
  try {
    const result = await About.findOneAndUpdate({
        _id: req.params.id
      },
      {
        $set: {
          title: req.body.title,
          introduction: req.body.introduction,
          cover: req.body.cover,
          release_date: req.body.release_date,
        }
      }, {
        new: true,
      });
    return res.status(201).send(result);
  } catch (e) {
    return res.json(e.message);
  }
});

router.delete('/abouts/:id', async (req, res) => {
  try {
    const result = await About.findOneAndRemove({
      _id: req.params.id
    });
    return res.status(204).json(result);
  } catch (e) {
    return res.status(404).send('404 Not Found');
  }
});

/* batch delete about item */
router.post('/batchAbouts', async (req, res) => {
  try {
    const result = await About.remove({_id: {$in: req.body.selectedList}});
    if (result.n === 0) {
      return res.status(404).send('404 Not Found');
    } else {
      return res.status(200).send(result);
    }
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

module.exports = router;

