// build your `/api/resources` router here
const express = require('express');

const Resources = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.getAll()
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
    if (!body.resource_name) {
        res.status(400).json({
            message: 'Bad Request'
        });
    }
    else {
        Resources.getByName(body.resource_name)
            .then(resource => {
                if (resource) {
                    res.status(404).json({
                        message: 'Not Found'
                    });
                }
                else {
                    Resources.create(body)
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
    }
});

module.exports = router;
