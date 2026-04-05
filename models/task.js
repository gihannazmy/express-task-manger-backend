const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
      priority: {
    type: String,
    enum: ['low', 'neutral', 'high'],
    default: 'neutral'
    },
    dueDate: { type: Date, default: Date.now },
       completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Task must belong to a user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    });

    // Index for faster queries
    taskSchema.index({ user: 1, createdAt: -1 });

    const Task = mongoose.model('Task', taskSchema);
    module.exports = Task;