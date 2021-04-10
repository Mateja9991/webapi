const mongoose = require('mongoose')
//
//              Schema
//
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    members: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }]
});
//
//              Virtuals
//
//  Projekti ovog tima
teamSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'team'
});
//
//
//
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;