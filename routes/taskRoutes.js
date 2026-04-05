const express = require('express');
const router = express.Router();

const User = require('../models/task');
const {createTask, updateTask, deleteTask, getAllUserTask} = require('../controllers/taskController');
const protect = require('../middleware/auth');



// Use the protect middleware
router.use(protect);
router.post('/create-task', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/all', getAllUserTask);


module.exports = router;