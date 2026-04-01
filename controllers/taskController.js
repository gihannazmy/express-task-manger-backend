const Task = require('../models/task');
const AppError = require('../utils/AppError');



const createTask = async (req, res, next) => {
    try {
    const {title, priority, duedate} = req.body;
    if (!title || !priority) {
        return next(new AppError('Insufficient info', 400));
    }
    const taskCreated = await Task.create({title, priority, duedate, user:req.user._id});
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
        const tasks = await Task.find({user: req.user._id});
        res.status(200).json({
            status : 'success',
            data: tasks,
        });
    }
        
    catch (err) {
    next(err);
  }
}

const editTask = async (req, res, next) =>{
    try{
        const taskId = req.params.id;
        const task = await Task.findOne({_id:taskId, user: req.user._id})
        if (!task) {
        return next(new AppError('Task not found or not yours', 404));
        }       
            
        
        Object.assign(task, req.body);
        await task.save();
        res.status(200).json({
            status: 'success',
            data: task,
        });
            

    } catch (err) {
     next(err);

    }
}

const deleteTask = async (req, res, next) =>{
        try{ 
            const task = await Task.findByIdAndDelete({_id:req.params.id, user:req.user._id})
            if (!task) {
                return res.status(404).json({status:'fail' ,messge: 'Task can not be found'});

            }
            res.status(200).json({status: 'success',message: 'Task deleted successfully'})
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