// build your `Project` model here
const db = require('../../data/dbConfig');

const getAll = () => {
    return db('projects').then(projects => {
        const newProjects = projects.map(({ project_id, project_name, project_description, project_completed }) => {
            return {
                project_id,
                project_name,
                project_description,
                project_completed: (project_completed === 0 || project_completed === null) ? false : true
            };
        });
        return newProjects;
    });
};

const getById = (project_id) => {
    return db('projects')
        .where({ project_id })
        .first();
};

const create = (project) => {
    return db('projects')
        .insert(project)
        .then(ids => {
            return getById(ids[0])
                .then(({ project_id, project_name, project_description, project_completed }) => {
                    return {
                        project_id,
                        project_name,
                        project_description,
                        project_completed: (project_completed === 0 || project_completed === null) ? false : true
                    };
                });
        });
};

module.exports = {
    getAll,
    create
};
