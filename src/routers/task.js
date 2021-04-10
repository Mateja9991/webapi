const express = require("express");
const {
  authAddToTask,
  authTeamLeader,
  authProject,
  authAddToList,
} = require("../middleware/auth");
const { jwtAuthMiddleware } = require("../middleware");
const User = require("../models/user");
const Task = require("../models/task");
const Team = require("../models/team");
const Project = require("../models/project");
const router = new express.Router();

router.post(
  "/tasks/list/:listId",
  jwtAuthMiddleware,
  authAddToList,
  async (req, res) => {
    try {
      const task = new Task({
        ...req.body,
        creator: req.user._id,
        list: req.list._id,
      });
      await taks.save();
      res.send(task);
    } catch (e) {
      res.status(400).send();
    }
  }
);

router.post(
  "/tasks/sub/:taskId",
  jwtAuthMiddleware,
  authAddToTask,
  async (req, res) => {
    try {
      const task = new Task({
        ...req.body,
        creator: req.user._id,
        list: req.list._id,
      });
      await taks.save();
      res.send(task);
    } catch (e) {
      res.status(400).send();
    }
  }
);

router.get("/tasks/me", jwtAuthMiddleware, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === true;
  }
  try {
    await req.user
      .populate({
        path: "tasks",
        match,
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/tasks", jwtAuthMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", jwtAuthMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedToUpdate = ["completed", "description"];
  const isValidUpdate = updates.every((update) =>
    allowedToUpdate.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send();
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
});

router.delete("/tasks/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
