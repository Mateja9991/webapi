const express = require("express");
const { jwtAuthMiddleware } = require("../middleware");
const User = require("../models/user");
const Task = require("../models/task");
const Team = require("../models/team");
const Project = require("../models/project");

const router = new express.Router();
//
//              Routes
//
//  Kreiranje komentara
router.post("/comment/:taskId", jwtAuthMiddleware, async (req, res) => {
  try {
  } catch (e) {}
});

module.exports = router;
