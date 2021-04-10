const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/user');
const Task = require('../models/task');
const Team = require('../models/team');
const Project = require('../models/project');
const router = new express.Router();

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    req.user.populate('teams');
    res.send(req.user);
});

router.get('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }
    catch (e) {
        res.status(500).send();
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedToUpdate = ['name', 'email', 'password', 'age'];
    const isValidUpdate = updates.every(update => allowedToUpdate.includes(update));

    if (!isValidUpdate) {
        return res.status(404).send();
    }

    try {
        updates.forEach(update => {
            req.user[update] = req.body[update];
        });
        await req.user.save();
        res.send(req.user);
    }
    catch (e) {
        res.status(400).send();
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {

        await req.user.remove();
        res.send(req.user);
    }
    catch (e) {
        res.status(500).send();
    }
});


module.exports = router;
