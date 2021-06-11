// build your `/api/tasks` router here
const express = require('express');

const Tasks = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.getAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        });
});

router.post('/', (req, res) => {
    const { body } = req;
    if (!body.task_description || !body.project_id) {
        res.status(400).json({
            message: 'Bad Request'
        });
    }
    else {
        Tasks.getProjectId(body.project_id)
            .then(project => {
                if (!project) {
                    res.status(404).json({
                        message: 'Not Found'
                    });
                }
                else {
                    Tasks.create(body)
                        .then(data => {
                            res.status(201).json(data);
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'Internal Server Error',
                                error: err.message
                            });
                        });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                });
            });
    }
});

module.exports = router;
