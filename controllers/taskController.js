const Task = require('../models/task');
const AppError = require('../utils/AppError');


const createTask = async(req,res, next) =>{
    try{
        const {title, priority, dueDate, } = req.body;
        if(!title) {
            return next(new AppError('No Title', 400));
        }
        const taskCreated = await Task.create({title, priority, dueDate, user: req.user.id });
        res.status(201).json({
            status: 'success',
            date: taskCreated,
        });
    }
    catch(err){
        next(err)
    }
}
const getAllUserTask = async (req, res, next) =>{
    try{
        tasks = await Task.find({ user: req.user.id});
        res.status(200).json({
            status: 'success',
            data: {tasks}
        });


    }catch (err){
        next(err);
    };
}
const updateTask = async(req, res, next) =>{
    try{
        const taskId = req.params.id;
        const allowedUpdates = ['title', 'priority', 'dueDate'];
        const updates = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });
        const updatedTask = await Task.findByIdAndUpdate(
            {
                _id: taskId,
                user: req.user.id
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );
        if(!updatedTask){
            return next(new AppError('No task found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                task: updatedTask
            }
        });


    } catch (err) {
        next(err);
    }
};

const deleteTask = async(req, res, next) =>
{
    try{
        const taskId = req.params.id;
        const deletedTask = await Task.findOneAndDelete({
            _id:taskId,
            user: req.user.id
        });
        if(!deletedTask) {
            return next(new AppError('No task found with that ID', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch(err){
        next(err);
    }
};



module.exports = {
    createTask,
    deleteTask,
    updateTask,
    getAllUserTask,
}