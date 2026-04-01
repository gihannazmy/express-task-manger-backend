const Task = require('../models/task');
const AppError = require('../utils/AppError');



const createTask = async (req, res, next) => {
    try {
    const {title, priority, duedate} = req.body;
    if (!title || !priority) {
        return next(new AppError('Insufficient info', 400));
    }
    const taskCreated = await Task.create({title, priority, duedate})
    res.status(201).json({
    status: 'success',
    data: taskCreated,
    });
   
    }
    catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next ) =>{
    try{
        const tasks = await Task.find();
        res.send(tasks);
    }
        
    catch (err) {
    next(err);
  }
}

const editTask = async (req, res, next) =>{
    try{
        const taskId = req.params.id;

        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body)
        if(!updatedTask){
            return res.status(404).json({message: 'Task can not be found'})
        };
        res.status(200).json({
            status: 'success',
            data: updatedTask,
        });
            

    } catch (err) {
     next(err);

    }
}

const deleteTask = async (req, res, next) =>{
        try{ 
            task = await Task.findByIdAndDelete(req.params.id)
            if (!task) {
                return res.status(404).json({messge: 'Task can not be found'});

            }
            res.status(200).json({message: 'Task deleted successfully'}, task)
    }
    catch (err) {
    next(err);

    }
}

module.exports = {
    createTask,
    getTasks,
    deleteTask,
    editTask
}