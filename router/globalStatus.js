import express from 'express';
import { GlobalStatus } from '../models/index';

const router = express.Router();

router.get('/globalStatus', async (req, res, next) => {
  try {
      const result = await GlobalStatus.find({}).sort({_id: -1});
    return res.status(200).json(result[0]);
  } catch (e) {
    return res.json(e.message);
  }
});

router.post('/fullSiteGray', (req, res, next) => {
  try {
      GlobalStatus.create(req.body, (err, UserInfo) => {
      if(err){
        return res.json(err);
      }else {
        return res.status(200).json(UserInfo);
      }
    })
  } catch (e) {
    return res.status(500).send('Unknown Server Error');
  }
});

router.put('/fullSiteGray/:id', async (req, res) => {
  try {
    const result = await GlobalStatus.findOneAndUpdate({
        _id: req.params.id
      },
      {
        $set: {
            full_site_gray: req.body.full_site_gray,
        }
      }, {
        new: true,
      });
    return res.status(201).send(result);
  } catch (e) {
    return res.json(e.message);
  }
});

module.exports = router;

