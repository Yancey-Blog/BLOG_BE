'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _jwt = require('./jwt/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _article = require('./router/article');

var _article2 = _interopRequireDefault(_article);

var _player = require('./router/player');

var _player2 = _interopRequireDefault(_player);

var _project = require('./router/project');

var _project2 = _interopRequireDefault(_project);

var _cover = require('./router/cover');

var _cover2 = _interopRequireDefault(_cover);

var _motto = require('./router/motto');

var _motto2 = _interopRequireDefault(_motto);

var _announcement = require('./router/announcement');

var _announcement2 = _interopRequireDefault(_announcement);

var _liveTour = require('./router/liveTour');

var _liveTour2 = _interopRequireDefault(_liveTour);

var _featuredRecord = require('./router/featuredRecord');

var _featuredRecord2 = _interopRequireDefault(_featuredRecord);

var _yanceyMusic = require('./router/yanceyMusic');

var _yanceyMusic2 = _interopRequireDefault(_yanceyMusic);

var _workExperience = require('./router/workExperience');

var _workExperience2 = _interopRequireDefault(_workExperience);

var _programExperience = require('./router/programExperience');

var _programExperience2 = _interopRequireDefault(_programExperience);

var _about = require('./router/about');

var _about2 = _interopRequireDefault(_about);

var _user = require('./router/user');

var _user2 = _interopRequireDefault(_user);

var _bandwagon = require('./router/bandwagon');

var _bandwagon2 = _interopRequireDefault(_bandwagon);

var _uploader = require('./tools/uploader');

var _uploader2 = _interopRequireDefault(_uploader);

var _userInfo = require('./router/userInfo');

var _userInfo2 = _interopRequireDefault(_userInfo);

var _globalStatus = require('./router/globalStatus');

var _globalStatus2 = _interopRequireDefault(_globalStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_express2.default.static('dist'));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Expose-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(_jwt2.default);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json(err);
  }
  next();
});
app.use('/api', _article2.default);
app.use('/api', _player2.default);
app.use('/api', _project2.default);
app.use('/api', _cover2.default);
app.use('/api', _motto2.default);
app.use('/api', _announcement2.default);
app.use('/api', _liveTour2.default);
app.use('/api', _featuredRecord2.default);
app.use('/api', _yanceyMusic2.default);
app.use('/api', _workExperience2.default);
app.use('/api', _programExperience2.default);
app.use('/api', _about2.default);
app.use('/api', _uploader2.default);
app.use('/api', _user2.default);
app.use('/api', _bandwagon2.default);
app.use('/api', _userInfo2.default);
app.use('/api', _globalStatus2.default);

app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'public', 'favicon.ico')));

app.listen(3001, () => {
  console.log('listening on port 3001');
});

module.exports = app;