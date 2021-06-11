// build your `Task` model here
const db = require('../../data/dbConfig');

const getAll = () => {
    return db('tasks').then(async tasks => {
        let newTasks = [];

        for (let i = 0; i < tasks.length; i++) {
            const { task_id, task_description, task_notes, task_completed, project_id } = tasks[i];

            const { project_name, project_description } = await db('projects').where({ project_id }).first();

            newTasks.push({
                task_id,
                task_description,
                task_notes,
                task_completed: (task_completed === 0 || task_completed === null) ? false : true,
                project_name,
                project_description
            });
        }

        return newTasks;
    });
};

const getById = (task_id) => {
    return db('tasks')
        .where({ task_id })
        .first();
};

const create = (task) => {
    return db('tasks')
        .insert(task)
        .then(ids => {
            return getById(ids[0])
                .then(({ task_id, task_description, task_notes, task_completed, project_id }) => {
                    return {
                        task_id,
                        task_description,
                        task_notes,
                        task_completed: (task_completed === 0 || task_completed === null) ? false : true,
                        project_id
                    };
                });
        });
};

const getProjectId = (project_id) => {
    return db('projects')
        .where({ project_id })
        .first();
};

module.exports = {
    getAll,
    create,
    getProjectId
};
