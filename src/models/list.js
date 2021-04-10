const mongoose = require('mongoose')
//
//              Schema
//
const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },

});
//
//              Virtuals
//
//  Taskovi unutar liste
listSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'list'
});
//
//
//
const List = mongoose.model('List', listSchema);

module.exports = List;