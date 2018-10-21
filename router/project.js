import express from 'express';
import {Project} from '../models/index';

const router = express.Router();

router.get('/projects', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime(),
    });
    const result = await Project.find({}).sort({_id: -1});
    return res.status(200).json(result);
  } catch (e) {
    return next(e)
  }
});

router.get('/latestThreeProjects', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime(),
    });
    const result = await Project.find({}).limit(3).sort({_id: -1});
    return res.status(200).json(result);
  } catch (e) {
    return next(e)
  }
});

router.post('/projects', (req, res, next) => {
  try {
    Project.create(req.body, (err, Project) => {
      err ? res.json(err) : res.status(200).json(Project);
    })
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const result = await Project.findOneAndUpdate({
        _id: req.params.id
      },
      {
        $set: {
          title: req.body.title,
          introduction: req.body.introduction,
          poster: req.body.poster,
          url: req.body.url,
        }
      }, {
        new: true,
      });
    res.status(201).send(result);
  } catch (e) {
    res.json(e.message);
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const result = await Project.findOneAndRemove({
      _id: req.params.id
    });
    return res.status(204).json(result);
  } catch (e) {
    return res.status(404).send('404 Not Found');
  }
});

/* batch delete covers*/
router.post('/batchProjects', async (req, res) => {
  try {
    const result = await Project.remove({_id: {$in: req.body.selectedList}});
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

