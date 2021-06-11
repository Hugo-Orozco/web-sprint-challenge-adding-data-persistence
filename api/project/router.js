// build your `/api/projects` router here
const express = require('express');

const Projects = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        });
});

router.post('/', (req, res) => {
    const { body } = req;
    if (!body.project_name) {
        res.status(400).json({
            message: 'Bad Request'
        });
    }
    else {
        Projects.create(body)
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
});

module.exports = router;
