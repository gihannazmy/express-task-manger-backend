const express = require('express');
const router = express.Router();


const Task = require('../models/task');
const {createTask, getTasks, deleteTask, editTask} = require('../controllers/taskController')


//to get all tasks
router.get('/', getTasks);
//to add a new task
router.post('/', createTask)
//to edit a specidic task
router.put('/id', editTask)
// to delete a specific task
router.delete('/id', deleteTask)


module.exports = router;