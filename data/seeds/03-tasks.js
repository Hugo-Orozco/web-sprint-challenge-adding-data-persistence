const tasks = [
    { task_description: 'Do foo', project_id: 1 },
    { task_description: 'Do bar', task_notes: 'Use Postman!', project_id: 1 },
    { task_description: 'Do baz', task_notes: 'Have fun!', task_completed: 1, project_id: 2 }
];

exports.tasks = tasks;

exports.seed = function(knex) {
    return knex('tasks').insert(tasks);
};