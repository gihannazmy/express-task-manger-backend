const express = require('express');
const router = express.Router();


const Task = require('../models/task');


//to get all tasks
router.get('/', async (req, res, next) =>
{
    const tasks = await Task.find();
    res.send(tasks);
});
//to add a new task
router.post('/', async (req, res, next) =>
{
    const {title, priority, duedate} = req.body;
    const taskCreated = await Task.create({title, priority, duedate})
    res.send(taskCreated);
})