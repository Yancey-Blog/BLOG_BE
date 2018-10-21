import express from 'express';
import { ProgramExperience } from '../models/index';

const router = express.Router();

router.get('/programExperience', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime(),
        });
        const result = await ProgramExperience.find({}).sort({_id: -1});
        return res.status(200).json(result);
    } catch (e) {
        return next(e)
    }
});


router.post('/programExperience', (req, res, next) => {
    try {
        ProgramExperience.create(req.body, (err, ProgramExperience) => {
            err ? res.json(err) : res.status(200).json(ProgramExperience);
        })
    } catch (e) {
        return res.status(500).send('Unknown Server Error');
    }
});

router.put('/programExperience/:id', async (req, res) => {
    try {
        const result = await ProgramExperience.findOneAndUpdate({
                _id: req.params.id
            },
            {
                $set: {
                    program_name: req.body.program_name,
                    program_url: req.body.program_url,
                    program_content: req.body.program_content,
                    program_technology_stack: req.body.program_technology_stack,
                }
            }, {
                new: true,
            });
        res.status(201).send(result);
    } catch (e) {
        res.json(e.message);
    }
});

router.delete('/programExperience/:id', async (req, res) => {
    try {
        const result = await ProgramExperience.findOneAndRemove({
            _id: req.params.id
        });
        return res.status(204).json(result);
    } catch (e) {
        return res.status(404).send('404 Not Found');
    }
});


module.exports = router;

