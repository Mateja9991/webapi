const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/user');
const Task = require('../models/task');
const Team = require('../models/team');
const Project = require('../models/project');

const router = new express.Router();
//
//              Routes
//
//  Kreiranje komentara
router.post('/comment/:taskId', auth, async (req, res) => {
    try {

    }
    catch (e) {

    }
})

module.exports = router;