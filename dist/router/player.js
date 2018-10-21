'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/players', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime()
        });
        const result = await _index.Player.find({}).sort({ _id: -1 });
        return res.status(200).json(result);
    } catch (e) {
        return next(e);
    }
});

router.get('/litePlayers', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime()
        });
        const result = await _index.Player.find({ show: { $ne: false } }).sort({ _id: -1 });
        return res.status(200).json(result);
    } catch (e) {
        return next(e);
    }
});

router.post('/players', (req, res, next) => {
    try {
        _index.Player.create(req.body, (err, Player) => {
            err ? res.json(err) : res.status(200).json(Player);
        });
    } catch (e) {
        return res.status(500).send('Unknown Server Error');
    }
});

router.put('/players/:id', async (req, res) => {
    try {
        const result = await _index.Player.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title,
                artist: req.body.artist,
                cover: req.body.cover,
                music_file_url: req.body.music_file_url,
                lrc: req.body.lrc,
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

router.delete('/players/:id', async (req, res) => {
    try {
        const result = await _index.Player.findOneAndRemove({
            _id: req.params.id
        });
        return res.status(204).json(result);
    } catch (e) {
        return res.status(404).send('404 Not Found');
    }
});

/* batch delete covers*/
router.post('/batchPlayers', async (req, res) => {
    try {
        const result = await _index.Player.remove({ _id: { $in: req.body.selectedList } });
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