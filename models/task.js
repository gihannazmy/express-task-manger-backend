

const {default : mongoose} = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  
  title:{
        type: String,
    },
priority: {
  type: String,
  enum: ['low', 'neutral', 'high'],
  default: 'neutral'
},
  dueDate: { type: Date, default: Date.now },
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;