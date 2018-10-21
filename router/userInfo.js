import express from 'express';
import { UserInfo } from '../models/index';

const router = express.Router();

router.get('/userInfo', async (req, res, next) => {
  try {
    const result = await UserInfo.find({}).sort({_id: -1});
    return res.status(200).json(result[0]);
  } catch (e) {
    return res.json(e.message);
  }
});

router.post('/userInfo', (req, res, next) => {
  try {
    UserInfo.create(req.body, (err, UserInfo) => {
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

router.put('/userInfo/:id', async (req, res) => {
  try {
    const result = await UserInfo.findOneAndUpdate({
        _id: req.params.id
      },
      {
        $set: {
            user_name: req.body.user_name,
            position: req.body.position,
            self_introduction: req.body.self_introduction,
            city: req.body.city,
            avatar: req.body.avatar,
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

