const mongoose = require('mongoose');
//
//              Schema
//
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        requred: true,
        ref: 'List'
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    editors: [{
        editor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }]
}, {
    timestamps: true
});
//
//              Virtuals
//
//  Podtaskovi unutar taska
taskSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'parentTask'
});
//
//
//
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;