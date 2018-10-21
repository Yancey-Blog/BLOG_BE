'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const serverStatus = `${_constant.BANDWAGON_BASE_URL}getLiveServiceInfo?veid=${_constant.BANDWAGON_SERVER_ID}&api_key=${_constant.BANDWAGON_SECRET_KEY}`;
const runningStatus = `${_constant.BANDWAGON_BASE_URL}getRawUsageStats?veid=${_constant.BANDWAGON_SERVER_ID}&api_key=${_constant.BANDWAGON_SECRET_KEY}`;

const options1 = {
  uri: serverStatus,
  json: true
};
router.get('/serviceInfo', (req, res) => {
  (0, _requestPromise2.default)(options1).then(function (repos) {
    res.status(200).json(repos);
  }).catch(function (err) {
    // API call failed...
  });
});

const options2 = {
  uri: runningStatus,
  json: true
};
router.get('/usageStats', (req, res) => {
  (0, _requestPromise2.default)(options2).then(function (repos) {
    res.status(200).json(repos);
  }).catch(function (err) {
    // API call failed...
  });
});

module.exports = router;