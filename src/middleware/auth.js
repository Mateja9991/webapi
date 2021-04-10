const jwt = require('jsonwebtoken');
const User = require('../models/user');
//
//              Autentifikacije
//
//  Autentifikacija usera (JEL PRIJAVLJEN)
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).send({
            error: 'Please Authenticate.'
        });
    }
}
//  Autentifikacija clanova (JEL USER CLAN TIMA)
const authMember = async (req, res, next) => {
    try {
        const team = Team.findById(req.params.teamId);
        await team.populate('members').execPopulate();
        team.members.forEach(member => {
            if (member._id === req.user._id) {
                req.team = team;
            }
        });
        if (!req.team) {
            throw new Error();
        }
        //
        //  POPULATE SVE
        //
        next();
    }
    catch (e) {
        res.status(401).send({
            error: 'Please Authenticate.'
        });
    }
}

//
//      CHECK 
//
const authTeamLeader = async (req, res, next) => {
    try {
        const team = Team.findById(req.params.teamId);
        await team.populate('leader').execPopulate();
        if (team.leader._id !== req.user._id) {
            throw new Error();
        }
        req.team = team;
        next();
    }
    catch (e) {
        res.status(401).send({
            error: 'Please Authenticate.(authTeam)'
        });
    }
}
const authProject = async (req, res, next) => {
    try {
        const project = Project.findById(req.params.projectId);
        await project.populate('team').execPopulate();
        if (project.team._id !== req.team._id) {
            throw new Error();
        }
        req.project = project;
        next();
    }
    catch (e) {
        res.status(401).send({
            error: 'Please Authenticate.(authProjet)'
        });
    }
};
const authAddToList = async (req, res, next) => {
    try {
        const list = List.findById(req.params.listId);

        await list.populate('project').execPopulate();
        await list.project.populate('team').execPopulate();
        await list.project.team.populate('leader').execPopulate();
        if (list.project.team.leader._id !== req.user._id) {
            throw new Error();
        }
        req.list = list;
        next();
    }
    catch (e) {
        res.status(401).send({
            error: 'Please Authenticate.(authList)'
        });
    }
};
const authAddToTask = async (req, res, next) => {
    try {
        const task = task.findById(req.params.taskId);
        let test = false;
        const user = task.editors.find(editor => editor._id === req.user._id)
        if (!user) {
            throw new Error();
        }
        req.task = task;
        next();
    }
    catch (e) {
        res.status(401).send({
            error: 'Please Authenticate.(authList)'
        });
    }
};
module.exports = {
    auth,
    authTeamLeader,
    authProject,
    authAddToList,
    authAddToTask,
    authMember,
}