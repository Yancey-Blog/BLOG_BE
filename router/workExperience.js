import express from 'express';
import { WorkExperience } from '../models/index';

const router = express.Router();

router.get('/workExperience', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime(),
        });
        const result = await WorkExperience.find({}).sort({_id: -1});
        return res.status(200).json(result);
    } catch (e) {
        return next(e)
    }
});


router.post('/workExperience', (req, res, next) => {
    try {
        WorkExperience.create(req.body, (err, WorkExperience) => {
            err ? res.json(err) : res.status(200).json(WorkExperience);
        })
    } catch (e) {
        return res.status(500).send('Unknown Server Error');
    }
});

router.put('/workExperience/:id', async (req, res) => {
    try {
        const result = await WorkExperience.findOneAndUpdate({
                _id: req.params.id
            },
            {
                $set: {
                    enterprise_name: req.body.enterprise_name,
                    position: req.body.position,
                    in_service: req.body.in_service,
                    work_content: req.body.work_content,
                    work_technology_stack: req.body.work_technology_stack,
                }
            }, {
                new: true,
            });
        res.status(201).send(result);
    } catch (e) {
        res.json(e.message);
    }
});

router.delete('/workExperience/:id', async (req, res) => {
    try {
        const result = await WorkExperience.findOneAndRemove({
            _id: req.params.id
        });
        return res.status(204).json(result);
    } catch (e) {
        return res.status(404).send('404 Not Found');
    }
});


module.exports = router;

