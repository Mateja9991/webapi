const mongoose = require('mongoose');
//
//              Schema
//
const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        maxlength: [250, 'Comment too long. (>250)']
    },
    likes: {
        type: Number,
        default: 0
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Task'
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
});
//
//              Virtuals
//
//  Podkomentari - Komentari na ovaj komentar
commentSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentComment'
});
//
//
//
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;