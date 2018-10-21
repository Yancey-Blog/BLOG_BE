import express from 'express';
import rp from 'request-promise';
import {BANDWAGON_BASE_URL, BANDWAGON_SECRET_KEY, BANDWAGON_SERVER_ID} from '../tools/constant';

const router = express.Router();

const serverStatus = `${BANDWAGON_BASE_URL}getLiveServiceInfo?veid=${BANDWAGON_SERVER_ID}&api_key=${BANDWAGON_SECRET_KEY}`;
const runningStatus = `${BANDWAGON_BASE_URL}getRawUsageStats?veid=${BANDWAGON_SERVER_ID}&api_key=${BANDWAGON_SECRET_KEY}`;


const options1 = {
  uri: serverStatus,
  json: true
};
router.get('/serviceInfo', (req, res) => {
  rp(options1)
    .then(function (repos) {
      res.status(200).json(repos);
    })
    .catch(function (err) {
      // API call failed...
    });
});


const options2 = {
  uri: runningStatus,
  json: true
};
router.get('/usageStats', (req, res) => {
  rp(options2)
    .then(function (repos) {
      res.status(200).json(repos);
    })
    .catch(function (err) {
      // API call failed...
    });
});

module.exports = router;

