// build your `Resource` model here
const db = require('../../data/dbConfig');

const getAll = () => {
    return db('resources');
};

const getById = (resource_id) => {
    return db('resources')
        .where({ resource_id })
        .first();
};

const create = (resource) => {
    return db('resources')
        .insert(resource)
        .then(ids => {
            return getById(ids[0]);
        });
};

const getByName = (resource_name) => {
    return db('resources')
        .where({ resource_name })
        .first();
};

module.exports = {
    getAll,
    create,
    getByName
};
